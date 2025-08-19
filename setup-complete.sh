#!/bin/bash
#
# Complete Digital Pathology Tutorial System Setup Script
#
# This script provides a comprehensive setup for the digital pathology tutorials
# with all dependencies, data downloads, and environment validation.

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"
LOG_FILE="$PROJECT_ROOT/setup.log"
DATA_DIR="$PROJECT_ROOT/data"
RESULTS_DIR="$PROJECT_ROOT/results"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

# Header
print_header() {
    echo "=============================================================================="
    echo " Digital Pathology Tutorial System - Complete Setup"
    echo "=============================================================================="
    echo " This script will:"
    echo " 1. Check system requirements"
    echo " 2. Set up Python environment"
    echo " 3. Install all dependencies"
    echo " 4. Download sample datasets"
    echo " 5. Validate the installation"
    echo "=============================================================================="
    echo
}

# Check system requirements
check_system_requirements() {
    log "Checking system requirements..."
    
    # Check Python version
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
        log "Python version: $PYTHON_VERSION"
        if [[ $(echo "$PYTHON_VERSION >= 3.11" | bc -l) -eq 1 ]]; then
            log "✅ Python version is compatible"
        else
            error "❌ Python 3.11+ required, found $PYTHON_VERSION"
        fi
    else
        error "❌ Python3 not found. Please install Python 3.11+"
    fi
    
    # Check memory
    if command -v free &> /dev/null; then
        TOTAL_MEM=$(free -g | awk '/^Mem:/{print $2}')
        log "Available memory: ${TOTAL_MEM}GB"
        if [ "$TOTAL_MEM" -ge 8 ]; then
            log "✅ Memory requirement met"
        else
            warn "⚠️ Recommended 8GB+ memory, found ${TOTAL_MEM}GB"
        fi
    fi
    
    # Check disk space
    AVAILABLE_SPACE=$(df -BG "$PROJECT_ROOT" | awk 'NR==2 {print $4}' | sed 's/G//')
    log "Available disk space: ${AVAILABLE_SPACE}GB"
    if [ "$AVAILABLE_SPACE" -ge 10 ]; then
        log "✅ Disk space requirement met"
    else
        warn "⚠️ Recommended 10GB+ free space, found ${AVAILABLE_SPACE}GB"
    fi
    
    # Check Git
    if command -v git &> /dev/null; then
        log "✅ Git is available"
    else
        error "❌ Git not found. Please install Git"
    fi
}

# Detect package manager
detect_package_manager() {
    if command -v conda &> /dev/null; then
        log "✅ Conda detected"
        PACKAGE_MANAGER="conda"
    elif command -v python3 -m venv &> /dev/null; then
        log "✅ Python venv available"
        PACKAGE_MANAGER="venv"
    else
        error "❌ No suitable package manager found. Install Anaconda or ensure Python3 venv is available"
    fi
}

# Setup conda environment
setup_conda_environment() {
    log "Setting up Conda environment..."
    
    if conda env list | grep -q pathology-tutorials-complete; then
        warn "Environment 'pathology-tutorials-complete' exists. Removing..."
        conda env remove -n pathology-tutorials-complete -y
    fi
    
    log "Creating new environment from environment-complete.yml..."
    conda env create -f environment-complete.yml
    
    log "✅ Conda environment created successfully"
}

# Setup virtual environment
setup_venv_environment() {
    log "Setting up Python virtual environment..."
    
    VENV_DIR="$PROJECT_ROOT/venv-complete"
    
    if [ -d "$VENV_DIR" ]; then
        warn "Virtual environment exists. Removing..."
        rm -rf "$VENV_DIR"
    fi
    
    log "Creating virtual environment..."
    python3 -m venv "$VENV_DIR"
    
    log "Activating virtual environment and installing dependencies..."
    source "$VENV_DIR/bin/activate"
    pip install --upgrade pip
    pip install -r requirements-complete.txt
    
    log "✅ Virtual environment created successfully"
}

# Install system dependencies
install_system_dependencies() {
    log "Installing system dependencies..."
    
    if command -v apt-get &> /dev/null; then
        # Ubuntu/Debian
        log "Detected Debian-based system. Installing OpenSlide..."
        sudo apt-get update
        sudo apt-get install -y openslide-tools libopencv-dev
    elif command -v brew &> /dev/null; then
        # macOS
        log "Detected macOS. Installing OpenSlide..."
        brew install openslide opencv
    elif command -v yum &> /dev/null; then
        # RedHat/CentOS
        log "Detected RedHat-based system. Installing dependencies..."
        sudo yum install -y openslide-devel opencv-devel
    else
        warn "⚠️ Unknown system. You may need to install OpenSlide manually"
        warn "   Visit: https://openslide.org/download/"
    fi
}

# Create directory structure
create_directories() {
    log "Creating directory structure..."
    
    mkdir -p "$DATA_DIR"/{samples,wsi,results,cache}
    mkdir -p "$RESULTS_DIR"/{plots,models,reports}
    mkdir -p "$PROJECT_ROOT/logs"
    
    log "✅ Directory structure created"
}

# Download sample datasets
download_sample_data() {
    log "Downloading sample datasets..."
    
    # Create a Python script to handle downloads
    cat > "$PROJECT_ROOT/download_data.py" << 'EOF'
#!/usr/bin/env python3
import os
import sys
import requests
from pathlib import Path
from tqdm import tqdm

def download_file(url, local_path):
    """Download file with progress bar"""
    local_path = Path(local_path)
    local_path.parent.mkdir(parents=True, exist_ok=True)
    
    if local_path.exists():
        print(f"✅ {local_path.name} already exists, skipping")
        return
    
    print(f"Downloading {local_path.name}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    total_size = int(response.headers.get('content-length', 0))
    
    with open(local_path, 'wb') as f:
        with tqdm(total=total_size, unit='B', unit_scale=True) as pbar:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    pbar.update(len(chunk))
    
    print(f"✅ Downloaded {local_path.name}")

def main():
    data_dir = Path("data")
    
    # Sample histopathology images
    samples = [
        ("https://openslide.cs.cmu.edu/download/openslide-testdata/Aperio/CMU-1-Small-Region.svs", 
         data_dir / "wsi" / "CMU-1-Small-Region.svs"),
        ("https://openslide.cs.cmu.edu/download/openslide-testdata/Aperio/CMU-1.svs",
         data_dir / "wsi" / "CMU-1.svs"),
    ]
    
    for url, local_path in samples:
        try:
            download_file(url, local_path)
        except Exception as e:
            print(f"❌ Failed to download {local_path.name}: {e}")
    
    print("✅ Sample data download completed")

if __name__ == "__main__":
    main()
EOF
    
    # Make it executable and run
    chmod +x "$PROJECT_ROOT/download_data.py"
    
    if [ "$PACKAGE_MANAGER" = "conda" ]; then
        conda run -n pathology-tutorials-complete python "$PROJECT_ROOT/download_data.py"
    else
        source "$PROJECT_ROOT/venv-complete/bin/activate"
        python "$PROJECT_ROOT/download_data.py"
    fi
    
    log "✅ Sample datasets downloaded"
}

# Validate installation
validate_installation() {
    log "Validating installation..."
    
    # Create validation script
    cat > "$PROJECT_ROOT/validate_setup.py" << 'EOF'
#!/usr/bin/env python3
import sys
import importlib

def test_import(module_name, package_name=None):
    """Test if a module can be imported"""
    try:
        importlib.import_module(module_name)
        print(f"✅ {package_name or module_name}")
        return True
    except ImportError as e:
        print(f"❌ {package_name or module_name}: {e}")
        return False

def main():
    print("Testing Python package imports...")
    print("-" * 50)
    
    # Core packages
    success = True
    packages = [
        ("numpy", "NumPy"),
        ("pandas", "Pandas"),
        ("matplotlib", "Matplotlib"),
        ("seaborn", "Seaborn"),
        ("sklearn", "Scikit-learn"),
        ("skimage", "Scikit-image"),
        ("PIL", "Pillow"),
        ("cv2", "OpenCV"),
        ("openslide", "OpenSlide"),
        ("torch", "PyTorch"),
        ("torchvision", "TorchVision"),
        ("timm", "TIMM"),
        ("plotly", "Plotly"),
        ("umap", "UMAP"),
        ("jupyterlab", "JupyterLab"),
    ]
    
    for module, name in packages:
        if not test_import(module, name):
            success = False
    
    print("-" * 50)
    
    if success:
        print("✅ All packages imported successfully!")
        print("🎉 Installation validation passed!")
        return 0
    else:
        print("❌ Some packages failed to import")
        print("Please check the installation logs")
        return 1

if __name__ == "__main__":
    sys.exit(main())
EOF
    
    chmod +x "$PROJECT_ROOT/validate_setup.py"
    
    if [ "$PACKAGE_MANAGER" = "conda" ]; then
        conda run -n pathology-tutorials-complete python "$PROJECT_ROOT/validate_setup.py"
    else
        source "$PROJECT_ROOT/venv-complete/bin/activate"
        python "$PROJECT_ROOT/validate_setup.py"
    fi
    
    VALIDATION_RESULT=$?
    
    if [ $VALIDATION_RESULT -eq 0 ]; then
        log "✅ Installation validation passed"
    else
        error "❌ Installation validation failed"
    fi
}

# Create startup scripts
create_startup_scripts() {
    log "Creating startup scripts..."
    
    # Conda startup script
    cat > "$PROJECT_ROOT/start-complete-conda.sh" << 'EOF'
#!/bin/bash
echo "🔬 Starting Digital Pathology Tutorials (Conda Environment)"
echo "============================================================="
echo
echo "Activating conda environment..."
conda activate pathology-tutorials-complete

echo "Setting environment variables..."
export DATA_DIR="$(pwd)/data"
export RESULTS_DIR="$(pwd)/results"
export PYTHONPATH="$(pwd):$PYTHONPATH"

echo "Starting JupyterLab..."
echo "📱 JupyterLab will be available at: http://localhost:8888"
echo "📂 Navigate to the 'notebooks' folder to start tutorials"
echo
jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
EOF
    
    # Virtual environment startup script
    cat > "$PROJECT_ROOT/start-complete-venv.sh" << 'EOF'
#!/bin/bash
echo "🔬 Starting Digital Pathology Tutorials (Virtual Environment)"
echo "=============================================================="
echo
echo "Activating virtual environment..."
source venv-complete/bin/activate

echo "Setting environment variables..."
export DATA_DIR="$(pwd)/data"
export RESULTS_DIR="$(pwd)/results"
export PYTHONPATH="$(pwd):$PYTHONPATH"

echo "Starting JupyterLab..."
echo "📱 JupyterLab will be available at: http://localhost:8888"
echo "📂 Navigate to the 'notebooks' folder to start tutorials"
echo
jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
EOF
    
    chmod +x "$PROJECT_ROOT/start-complete-conda.sh"
    chmod +x "$PROJECT_ROOT/start-complete-venv.sh"
    
    log "✅ Startup scripts created"
}

# Main setup function
main() {
    print_header
    
    # Initialize log file
    echo "Setup started at $(date)" > "$LOG_FILE"
    
    log "Starting complete setup process..."
    
    check_system_requirements
    detect_package_manager
    
    # Install system dependencies if needed
    if [ "$1" = "--with-system-deps" ]; then
        install_system_dependencies
    fi
    
    create_directories
    
    # Set up environment based on package manager
    if [ "$PACKAGE_MANAGER" = "conda" ]; then
        setup_conda_environment
    else
        setup_venv_environment
    fi
    
    download_sample_data
    validate_installation
    create_startup_scripts
    
    log "🎉 Setup completed successfully!"
    echo
    echo "=============================================================================="
    echo " Setup Complete! 🎉"
    echo "=============================================================================="
    echo
    echo "Next steps:"
    if [ "$PACKAGE_MANAGER" = "conda" ]; then
        echo "1. Start the tutorials: ./start-complete-conda.sh"
        echo "2. Or manually: conda activate pathology-tutorials-complete && jupyter lab"
    else
        echo "1. Start the tutorials: ./start-complete-venv.sh"
        echo "2. Or manually: source venv-complete/bin/activate && jupyter lab"
    fi
    echo "3. Open browser to: http://localhost:8888"
    echo "4. Navigate to 'notebooks' folder and start learning!"
    echo
    echo "Documentation: See COMPLETE_SETUP_README.md for detailed instructions"
    echo "Support: https://github.com/anand-indx/dp-t25/issues"
    echo
    echo "Happy learning! 🔬📊🤖"
    echo "=============================================================================="
}

# Run main function
main "$@"
