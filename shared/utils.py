"""
Digital Pathology Tutorial System Shared Utilities

Centralized helpers for:
- Environment config and path setup
- Persistent data directory resolution with Colab Drive support
- Reusable sample data preparation for tutorials
"""

import os
import sys
from typing import Optional, Dict, Any, Tuple, List
from pathlib import Path


def get_notebook_config() -> Dict[str, Any]:
    """Get notebook configuration parameters with safe, writable defaults.

    Prefers environment variables when set. Otherwise, resolves a writable
    data directory via get_data_dir(), and places results under that directory.
    """
    # Resolve a safe data dir first (honors DATA_DIR when set and writable)
    data_dir_path = get_data_dir()
    # Allow overriding via env if explicitly provided and writable
    env_data_dir = os.environ.get('DATA_DIR')
    if env_data_dir:
        from pathlib import Path as _Path
        _p = _Path(env_data_dir)
        try:
            _p.mkdir(parents=True, exist_ok=True)
            data_dir_path = _p
        except Exception:
            # ignore if not writable; keep resolved data_dir_path
            pass

    results_dir_env = os.environ.get('RESULTS_DIR')
    results_dir_path = (data_dir_path / 'results') if not results_dir_env else Path(results_dir_env)

    return {
        'data_dir': str(data_dir_path),
        'results_dir': str(results_dir_path),
        'temp_dir': os.environ.get('TEMP_DIR', '/tmp'),
        'max_image_size': int(os.environ.get('MAX_IMAGE_SIZE', '2048')),
        'cache_enabled': os.environ.get('CACHE_ENABLED', 'true').lower() == 'true'
    }

def setup_paths():
    """Set up necessary paths for tutorials in a safe, portable way.

    - Ensures data_dir and results_dir exist under a writable base.
    - Does NOT attempt to create hard-coded system locations like /workspace.
    - Keeps import side-effects minimal and safe.
    """
    config = get_notebook_config()
    # Ensure data and results directories exist (safe locations)
    for key in ('data_dir', 'results_dir'):
        try:
            os.makedirs(config[key], exist_ok=True)
        except Exception as e:
            print(f"⚠️ Could not create directory '{config[key]}': {e}")
    # temp_dir is typically /tmp; don't enforce creation beyond what's available
    # Add shared utilities to Python path (rarely needed, but harmless)
    shared_path = os.path.dirname(__file__)
    if shared_path and shared_path not in sys.path:
        sys.path.insert(0, shared_path)


# -----------------------------
# Colab/Paths/Data Dir helpers
# -----------------------------
def _in_colab() -> bool:
    try:
        import google.colab  # type: ignore
        return True
    except Exception:
        return False


def _mount_colab_drive() -> bool:
    try:
        from google.colab import drive  # type: ignore
        drive.mount('/content/drive', force_remount=False)
        return True
    except Exception as e:
        print(f"⚠️ Could not mount Google Drive: {e}")
        return False


def _is_writable(p: Path) -> bool:
    try:
        p.mkdir(parents=True, exist_ok=True)
        test = p / '.write_test'
        test.write_text('ok', encoding='utf-8')
        test.unlink(missing_ok=True)
        return True
    except Exception:
        return False


def get_data_dir(preferred_subdir: str = 'dp-t25', subfolder: str = 'data', auto_mount_colab: bool = True) -> Path:
    """
    Resolve a persistent, writable data directory to be shared across notebooks.

    Priority:
    1) DATA_DIR environment variable
    2) Colab Drive: /content/drive/MyDrive/<preferred_subdir>/<subfolder>
    3) Common locations: /workspace/data, ../data, ./data, ~/work/data, ~/data, /tmp/dp_t25_data
    """
    # 1) Env override
    env_dir = os.environ.get('DATA_DIR')
    if env_dir:
        p = Path(env_dir)
        if _is_writable(p):
            return p

    # 2) Colab Drive
    if _in_colab():
        if auto_mount_colab:
            _mount_colab_drive()
        drive_root = Path('/content/drive/MyDrive')
        if drive_root.exists():
            colab_dir = drive_root / preferred_subdir / subfolder
            if _is_writable(colab_dir):
                print(f"📦 Using Google Drive for data: {colab_dir}")
                return colab_dir
        # Fallback for Colab without Drive
        tmp_colab = Path('/content') / subfolder
        if _is_writable(tmp_colab):
            print(f"📦 Using Colab local path for data: {tmp_colab}")
            return tmp_colab

    # 3) Common local/Binder paths (avoid hard-coded unwritable roots)
    candidates = [
        Path('..') / subfolder,
        Path('.') / subfolder,
        Path.home() / 'work' / subfolder,
        Path.home() / subfolder,
        Path('/tmp') / 'dp_t25_data',
    ]
    for c in candidates:
        if _is_writable(c):
            return c

    # Last resort: current working directory
    fallback = Path.cwd() / subfolder
    fallback.mkdir(parents=True, exist_ok=True)
    return fallback


# -----------------------------
# Sample data preparation
# -----------------------------
def _tqdm():
    try:
        from tqdm import tqdm  # type: ignore
        return tqdm
    except Exception:
        return None

def download_file_with_progress(url: str, dst: Path, description: str = "Downloading") -> bool:
    """Download a URL to a destination path with a progress bar when possible.

    Returns True on success, False otherwise. Creates parent directories.
    """
    try:
        import requests  # type: ignore
        dst.parent.mkdir(parents=True, exist_ok=True)
        with requests.get(url, stream=True, timeout=60) as r:
            r.raise_for_status()
            total = int(r.headers.get('content-length', 0))
            pbar_cls = _tqdm()
            if pbar_cls:
                pbar = pbar_cls(total=total, unit='B', unit_scale=True, desc=description)
            else:
                pbar = None
            with open(dst, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
                        if pbar:
                            pbar.update(len(chunk))
            if pbar:
                pbar.close()
        print(f"✅ Downloaded {url} -> {dst}")
        return True
    except Exception as e:
        print(f"❌ Failed to download {url} -> {dst}: {e}")
        return False

def download_zenodo_record(record_id: str, data_dir: Path, filename_filter: Optional[str] = None, extract: bool = True) -> List[Path]:
    """Download files from a Zenodo record into data_dir.

    - record_id: the numeric Zenodo record id (e.g., '1234567').
    - filename_filter: optional substring or glob-like filter to select files.
    - extract: if True, extract any downloaded .zip archives into a 'tiles' subfolder.
    Returns list of downloaded file paths (and extracted dir if applicable).
    """
    downloaded: List[Path] = []
    try:
        import fnmatch
        import requests  # type: ignore
        import zipfile
        import io

        api_url = f"https://zenodo.org/api/records/{record_id}"
        resp = requests.get(api_url, timeout=60)
        resp.raise_for_status()
        data = resp.json()
        files = data.get('files') or []
        if not files and 'hits' in data:
            # Newer API variant returns search hits
            hits = data.get('hits', {}).get('hits', [])
            if hits:
                files = hits[0].get('files', [])
        if not files:
            print(f"⚠️ No files found for Zenodo record {record_id}")
            return downloaded

        def match(name: str) -> bool:
            if not filename_filter:
                return True
            # simple glob or substring
            return fnmatch.fnmatch(name, filename_filter) or (filename_filter in name)

        tiles_dir = data_dir / 'tiles'
        tiles_dir.mkdir(parents=True, exist_ok=True)

        for f in files:
            fname = f.get('key') or f.get('filename') or ''
            link = f.get('links', {}).get('self') or f.get('links', {}).get('download')
            if not fname or not link:
                continue
            if not match(fname):
                continue
            out_path = data_dir / fname
            if out_path.exists():
                print(f"ℹ️ Skipping existing {out_path.name}")
                downloaded.append(out_path)
            else:
                if download_file_with_progress(link, out_path, description=f"Zenodo:{fname}"):
                    downloaded.append(out_path)

            if extract and out_path.suffix.lower() == '.zip':
                try:
                    with zipfile.ZipFile(out_path, 'r') as zf:
                        zf.extractall(tiles_dir)
                    print(f"📦 Extracted {out_path.name} -> {tiles_dir}")
                except Exception as ee:
                    print(f"⚠️ Failed to extract {out_path}: {ee}")
        return downloaded
    except Exception as e:
        print(f"❌ Zenodo download failed for record {record_id}: {e}")
        return downloaded

def ensure_tiles_from_env_or_zenodo(data_dir: Path) -> List[Path]:
    """Fetch tiles archives based on environment variables or defaults.

    Supported environment variables:
      - TILES_ZIP_URL: direct URL to a .zip (download to DATA_DIR and extract to DATA_DIR/tiles)
      - ZENODO_RECORD: numeric record id to pull from zenodo.org
      - ZENODO_FILTER: optional filename glob/substring filter (e.g., "*tiles*.zip")
    Returns a list of relevant paths (downloaded archives or extracted folder).
    """
    results: List[Path] = []
    # Direct URL
    tiles_url = os.environ.get('TILES_ZIP_URL', '').strip()
    if tiles_url:
        dst = data_dir / Path(tiles_url).name
        if not dst.exists():
            if download_file_with_progress(tiles_url, dst, description=f"Tiles:{dst.name}"):
                results.append(dst)
        else:
            print(f"ℹ️ Tiles archive already present: {dst}")
            results.append(dst)
        # Extract
        try:
            import zipfile
            tiles_dir = data_dir / 'tiles'
            tiles_dir.mkdir(parents=True, exist_ok=True)
            with zipfile.ZipFile(dst, 'r') as zf:
                zf.extractall(tiles_dir)
            print(f"📦 Extracted {dst.name} -> {tiles_dir}")
            results.append(tiles_dir)
        except Exception as e:
            print(f"⚠️ Could not extract tiles archive {dst}: {e}")

    # Zenodo
    zenodo_record = os.environ.get('ZENODO_RECORD', '').strip()
    if zenodo_record:
        zenodo_filter = os.environ.get('ZENODO_FILTER', '').strip() or None
        results.extend(download_zenodo_record(zenodo_record, data_dir, filename_filter=zenodo_filter, extract=True))

    if not results:
        print("ℹ️ No tile sources configured (set TILES_ZIP_URL or ZENODO_RECORD). Using synthetic samples if needed.")
    return results
def _save_image(path: Path, array) -> bool:
    try:
        from PIL import Image
        path.parent.mkdir(parents=True, exist_ok=True)
        if getattr(array, 'ndim', None) == 2:
            img = Image.fromarray(array)
        else:
            img = Image.fromarray(array)
        img.save(path)
        return True
    except Exception as e:
        print(f"❌ Failed to save image {path}: {e}")
        return False


def ensure_image_processing_samples(data_dir: Path) -> List[str]:
    """Ensure small sample images exist (tiles + a grayscale) to be reused across notebooks."""
    created: List[str] = []
    try:
        import numpy as np
        try:
            from skimage import data as skdata
            from skimage.util import img_as_ubyte
            samples = {
                'sample_patch_1.jpg': img_as_ubyte(skdata.astronaut()),
                'sample_patch_2.jpg': img_as_ubyte(skdata.coffee()),
                'sample_tissue.png': img_as_ubyte(skdata.camera()),
            }
        except Exception:
            # Synthetic
            a = (np.random.rand(256, 256, 3) * 255).astype('uint8')
            b = (np.random.rand(256, 256, 3) * 255).astype('uint8')
            g = (np.random.rand(256, 256) * 255).astype('uint8')
            # Add simple regions
            a[64:128,64:128] = [200,150,200]
            b[160:220,120:220] = [220,180,190]
            samples = {
                'sample_patch_1.jpg': a,
                'sample_patch_2.jpg': b,
                'sample_tissue.png': g,
            }
        for name, arr in samples.items():
            out = data_dir / name
            if not out.exists():
                if _save_image(out, arr):
                    created.append(name)
            # Always report availability
            print(f"✅ {name} available at {out}")
    except Exception as e:
        print(f"⚠️ Could not prepare image-processing samples: {e}")
    return created


def ensure_color_normalization_samples(data_dir: Path) -> Tuple[Path, Dict[str, Dict[str, object]]]:
    """Ensure color normalization sample set and params JSON exist."""
    import json
    import numpy as np
    color_dir = data_dir / 'color_samples'
    color_dir.mkdir(parents=True, exist_ok=True)

    try:
        from skimage import data as skdata
        from skimage.util import img_as_ubyte
        he1 = img_as_ubyte(skdata.astronaut())
        he2 = img_as_ubyte(skdata.coffee())
        ref = img_as_ubyte(skdata.chelsea())
        tgt = img_as_ubyte(skdata.camera())
    except Exception:
        he1 = (np.random.rand(512,512,3)*255).astype('uint8')
        he1[100:200,100:200] = [200,150,200]
        he2 = (np.random.rand(512,512,3)*255).astype('uint8')
        he2[250:350,200:400] = [220,180,190]
        ref = (np.random.rand(512,512,3)*255).astype('uint8')
        tgt = (np.random.rand(512,512)*255).astype('uint8')

    files = {
        'he_stain_1.jpg': he1,
        'he_stain_2.jpg': he2,
        'reference_normal.png': ref,
        'target_tissue.png': tgt,
    }
    for name, arr in files.items():
        p = color_dir / name
        if not p.exists():
            _save_image(p, arr)
        print(f"✅ {name} available at {p}")

    normalization_params = {
        'macenko': {'luminosity_threshold': 0.8, 'alpha': 1.0, 'beta': 0.15},
        'reinhard': {'target_mu': [8.74108109, -0.12440419, 0.0444982], 'target_sigma': [0.6135447, 0.10989545, 0.0286032]},
        'vahadane': {'lambda1': 0.01, 'lambda2': 0.01, 'fast_mode': True},
    }
    params_file = color_dir / 'normalization_params.json'
    with open(params_file, 'w', encoding='utf-8') as f:
        json.dump(normalization_params, f, indent=2)
    print(f"📊 Saved normalization parameters to {params_file}")
    return color_dir, normalization_params


def get_wsi_path(data_dir: Path, env_var: str = 'WSI_PATH') -> Path:
    """
    Determine a WSI path to use across notebooks.
    Priority:
    - Environment variable WSI_PATH if valid
    - data_dir / 'CMU-1-Small-Region.svs' if exists
    - Otherwise, return a placeholder path under data_dir for user to supply
    """
    env = os.environ.get(env_var)
    if env and Path(env).exists():
        return Path(env)
    candidate = data_dir / 'CMU-1-Small-Region.svs'
    if candidate.exists():
        return candidate
    # Placeholder: user can upload or mount a file to this location
    print(f"⚠️ No WSI found. Expected at '{candidate}'. Upload or set {env_var}.")
    return candidate

def ensure_demo_wsi(data_dir: Path) -> Path:
    """Ensure a small demo WSI is available under data_dir.

    Priority:
      - If WSI_PATH env points to an existing file, return it.
      - If DATA_DIR/CMU-1-Small-Region.svs exists, return it.
      - Else, download from WSI_URL env, or fallback to OpenSlide demo URL.
    """
    env = os.environ.get('WSI_PATH')
    if env and Path(env).exists():
        return Path(env)
    candidate = data_dir / 'CMU-1-Small-Region.svs'
    if candidate.exists():
        return candidate
    url = os.environ.get('WSI_URL', '').strip() or \
          'https://openslide.cs.cmu.edu/download/openslide-testdata/Aperio/CMU-1-Small-Region.svs'
    if download_file_with_progress(url, candidate, description='WSI:CMU-1-Small-Region.svs'):
        return candidate
    print(f"⚠️ Could not retrieve demo WSI from {url}. Please set WSI_PATH or place a file at {candidate}")
    return candidate

def validate_environment() -> bool:
    """Validate that required packages are installed"""
    required_packages = [
        'numpy', 'pandas', 'matplotlib', 'PIL', 
        'sklearn', 'scipy', 'cv2'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            if package == 'PIL':
                import PIL
            elif package == 'cv2':
                import cv2
            else:
                __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print(f"Missing packages: {', '.join(missing_packages)}")
        return False
    
    print("✅ All required packages are available")
    return True

# Auto-setup when imported
if __name__ != "__main__":
    setup_paths()
