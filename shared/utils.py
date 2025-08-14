# Digital Pathology Tutorial System Shared Utilities

import os
import sys
from typing import Optional, Dict, Any

def get_notebook_config() -> Dict[str, Any]:
    """Get notebook configuration parameters"""
    return {
        'data_dir': os.environ.get('DATA_DIR', '/workspace/data'),
        'results_dir': os.environ.get('RESULTS_DIR', '/workspace/results'),
        'temp_dir': os.environ.get('TEMP_DIR', '/tmp'),
        'max_image_size': int(os.environ.get('MAX_IMAGE_SIZE', '2048')),
        'cache_enabled': os.environ.get('CACHE_ENABLED', 'true').lower() == 'true'
    }

def setup_paths():
    """Set up necessary paths for tutorials"""
    config = get_notebook_config()
    
    for path in [config['data_dir'], config['results_dir'], config['temp_dir']]:
        os.makedirs(path, exist_ok=True)
    
    # Add shared utilities to Python path
    shared_path = os.path.join(os.path.dirname(__file__))
    if shared_path not in sys.path:
        sys.path.insert(0, shared_path)

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
