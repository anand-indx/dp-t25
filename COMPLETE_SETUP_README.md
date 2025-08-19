# 🔬 Digital Pathology Tutorials - Complete Local Setup Guide

A comprehensive tutorial system for digital pathology and computational pathology, with complete offline capabilities and all dependencies included.

## 📋 Table of Contents
- [Quick Start](#-quick-start)
- [Prerequisites](#-prerequisites)
- [Installation Methods](#-installation-methods)
- [Tutorial Categories](#-tutorial-categories)
- [Data Management](#-data-management)
- [Environment Details](#-environment-details)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 🚀 Quick Start

### Option A: Docker (Recommended)
```bash
# 1. Clone the repository
git clone https://github.com/anand-indx/dp-t25.git
cd dp-t25

# 2. Checkout the complete notebooks branch
git checkout complete-notebooks

# 3. Start the system
./start.sh

# 4. Access the tutorials
# - Web Interface: http://localhost:3000
# - JupyterLab: http://localhost:8888
```

### Option B: Local Python Environment
```bash
# 1. Clone and setup
git clone https://github.com/anand-indx/dp-t25.git
cd dp-t25
git checkout complete-notebooks

# 2. Create conda environment
conda env create -f environment.yml
conda activate pathology-tutorials

# 3. Install additional packages
pip install -r requirements.txt

# 4. Start JupyterLab
jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
```

## 📦 Prerequisites

### System Requirements
**Minimum:**
- 8GB RAM
- 5GB free disk space
- Python 3.11+
- Git

**Recommended:**
- 16GB RAM
- 10GB free disk space
- SSD storage
- Multi-core CPU

### Software Dependencies

#### For Docker Setup:
- [Docker Desktop](https://docs.docker.com/get-docker/) (20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (2.0+)

#### For Local Python Setup:
- [Python 3.11+](https://www.python.org/downloads/)
- [Anaconda](https://www.anaconda.com/download) or [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
- [Git](https://git-scm.com/downloads)

## 🛠️ Installation Methods

### Method 1: Docker (Recommended for Beginners)

Docker provides the most reliable, consistent experience across all platforms.

#### Step-by-Step Docker Setup:

1. **Install Docker Desktop**
   - Windows: Download from [docker.com](https://docs.docker.com/desktop/windows/install/)
   - macOS: Download from [docker.com](https://docs.docker.com/desktop/mac/install/)
   - Linux: Follow [official instructions](https://docs.docker.com/engine/install/)

2. **Verify Docker Installation**
   ```bash
   docker --version
   docker compose version
   ```

3. **Clone and Start**
   ```bash
   git clone https://github.com/anand-indx/dp-t25.git
   cd dp-t25
   git checkout complete-notebooks
   chmod +x start.sh stop.sh  # Linux/macOS only
   ./start.sh
   ```

4. **Access the System**
   - Open browser to http://localhost:3000
   - Click on any tutorial to start learning

#### Docker Architecture:
```
┌─────────────────┐    ┌──────────────────┐
│   Frontend      │    │   JupyterLab     │
│   (React App)   │◄──►│   (Python Env)   │
│   Port: 3000    │    │   Port: 8888     │
└─────────────────┘    └──────────────────┘
         │                       │
         └───────────────────────┘
              Docker Network
```

### Method 2: Local Python Environment

For advanced users who prefer direct Python installation.

#### Conda Environment Setup:

1. **Install Conda**
   ```bash
   # Download and install Miniconda
   wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
   bash Miniconda3-latest-Linux-x86_64.sh
   ```

2. **Create Environment**
   ```bash
   git clone https://github.com/anand-indx/dp-t25.git
   cd dp-t25
   git checkout complete-notebooks
   
   # Create and activate environment
   conda env create -f environment.yml
   conda activate pathology-tutorials
   ```

3. **Install Additional Packages**
   ```bash
   # Install core scientific packages
   pip install -r requirements.txt
   
   # Install OpenSlide for WSI processing
   # Ubuntu/Debian:
   sudo apt-get install openslide-tools
   
   # macOS:
   brew install openslide
   
   # Windows: Download from https://openslide.org/download/
   ```

4. **Start JupyterLab**
   ```bash
   jupyter lab --ip=0.0.0.0 --port=8888 --no-browser
   ```

#### Virtual Environment Setup:

```bash
# Alternative: Python venv
python3.11 -m venv pathology-env
source pathology-env/bin/activate  # Linux/macOS
# pathology-env\Scripts\activate  # Windows

pip install --upgrade pip
pip install -r requirements.txt
pip install jupyterlab
jupyter lab
```

## 📚 Tutorial Categories

### 1. Image Processing Fundamentals (`/notebooks/image-processing-tutorials/`)
- **01_load_and_visualize.ipynb**: Loading and displaying histopathology images
- **02_resizing_and_grayscale.ipynb**: Basic image transformations
- **03_basic_augmentation.ipynb**: Data augmentation techniques
- **04_color_normalization.ipynb**: Stain normalization methods

### 2. Visualization and Statistics (`/notebooks/visualization-tutorials/`)
- **01_pandas_pathology.ipynb**: Data manipulation with pandas
- **02_statistical_plots.ipynb**: Statistical visualization techniques
- **03_heatmaps_correlation.ipynb**: Correlation analysis and heatmaps
- **04_umap_dimensionality.ipynb**: UMAP and dimensionality reduction

### 3. Machine Learning (`/notebooks/ml-tutorials/`)
- **01_feature_extraction.ipynb**: Feature engineering for pathology
- **02_classical_ml.ipynb**: Traditional ML algorithms
- **03_model_evaluation.ipynb**: Model validation and metrics
- **04_cross_validation.ipynb**: Advanced validation techniques

### 4. Deep Learning (`/notebooks/deep-learning-tutorials/`)
- **01_cnn_architecture.ipynb**: CNN basics for pathology
- **02_data_augmentation.ipynb**: Advanced augmentation
- **03_model_training.ipynb**: Training neural networks
- **04_hyperparameter_optimization.ipynb**: Model tuning
- **05_explainability_gradcam.ipynb**: Model interpretability
- **06_multiple_instance_learning_mil.ipynb**: MIL for pathology

### 5. Foundation Models (`/notebooks/foundation-models-tutorials/`)
- **01_foundation_models_overview.ipynb**: Introduction to foundation models
- **02_feature_extraction_timm_histology.ipynb**: Feature extraction with TIMM
- **03_zero_shot_clip_histology.ipynb**: Zero-shot learning with CLIP

### 6. Computational Pathology (`/notebooks/comp-pathology-tutorials/`)
- **01_wsi_tiling_openslide.ipynb**: WSI processing with OpenSlide
- **02_stain_normalization_macenko_vahadane.ipynb**: Advanced stain normalization
- **03_nuclei_segmentation_tiatoolbox.ipynb**: Cell segmentation
- **04_slide_level_MIL_intro.ipynb**: Slide-level analysis

### 7. WSI Processing (`/notebooks/wsi-tutorials/`)
- **01_read_visualize_wsi.ipynb**: Reading and visualizing whole slide images
- **02_patch_extraction.ipynb**: Extracting patches from WSIs
- **03_heatmap_overlay.ipynb**: Creating analysis heatmaps

## 💾 Data Management

### Automatic Data Downloads
The tutorials use intelligent data management:

```python
# Example from shared/utils.py
def get_data_dir():
    """Get appropriate data directory based on environment"""
    if 'google.colab' in sys.modules:
        return Path('/content/drive/MyDrive/pathology_data')
    else:
        return Path(os.getenv('DATA_DIR', './data'))

def ensure_image_processing_samples():
    """Download sample images if not present"""
    data_dir = get_data_dir()
    # Auto-download logic here...
```

### Data Sources
1. **Sample Images**: High-quality histopathology samples
2. **Zenodo Datasets**: Research-grade datasets for advanced tutorials
3. **OpenSlide Demo Data**: WSI examples for slide-level analysis
4. **Generated Data**: Synthetic datasets for ML tutorials

### Storage Locations
- **Local**: `./data/` directory in project root
- **Docker**: `/workspace/data` volume (persistent)
- **Colab**: Google Drive integration for persistence

## 🔧 Environment Details

### Core Dependencies

#### Python Packages (`requirements.txt`):
```txt
# Core Scientific Stack
numpy>=1.24.0,<2.0.0
pandas>=2.0.0
matplotlib>=3.7.0
seaborn>=0.12.0
scikit-learn>=1.3.0
scikit-image>=0.21.0

# Image Processing
Pillow>=10.0.0
opencv-python>=4.8.0
openslide-python>=1.2.0

# Deep Learning
torch>=2.0.0
torchvision>=0.15.0
timm>=0.9.0

# Visualization
plotly>=5.15.0
bokeh>=3.2.0
ipywidgets>=8.0.0

# ML/DL Extras
umap-learn>=0.5.0
transformers>=4.30.0
clip-by-openai>=1.0

# Jupyter
jupyterlab>=4.0.0
ipykernel>=6.25.0
```

#### System Packages (Docker/Conda):
```yaml
# environment.yml
name: pathology-tutorials
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11
  - openslide
  - libopencv
  - gcc
  - g++
  - make
  - git
```

### Environment Variables

Key configuration options:

```bash
# Data directory
export DATA_DIR="/path/to/your/data"

# Results output
export RESULTS_DIR="/path/to/results"

# WSI file location
export WSI_PATH="/path/to/wsi/files"

# Zenodo dataset URLs
export ZENODO_RECORD="your_zenodo_record_id"

# OpenSlide demo WSI
export WSI_URL="https://openslide.cs.cmu.edu/download/openslide-testdata/..."
```

## 🧪 Testing Your Setup

### Quick Validation:

1. **Start a test notebook**:
   ```python
   # Test cell - run this in any notebook
   import sys
   from shared import utils as u
   
   print("Python version:", sys.version)
   print("Data directory:", u.get_data_dir())
   
   # Test core packages
   import numpy, pandas, matplotlib, sklearn
   import PIL, cv2, openslide
   print("✅ All core packages imported successfully")
   ```

2. **Run a complete tutorial**:
   - Open `notebooks/image-processing-tutorials/notebooks/01_load_and_visualize.ipynb`
   - Run all cells (Cell → Run All)
   - Verify no errors occur

3. **Test data downloads**:
   ```python
   from shared.utils import ensure_image_processing_samples
   ensure_image_processing_samples()
   print("✅ Sample data downloaded successfully")
   ```

## 🐛 Troubleshooting

### Common Issues

#### Docker Problems:

**Port conflicts:**
```bash
# Check what's using ports 3000 and 8888
lsof -i :3000
lsof -i :8888

# Stop conflicting processes
docker compose down
pkill -f jupyter
```

**Container build failures:**
```bash
# Clean rebuild
docker compose down --rmi all
docker system prune -f
docker compose up --build -d
```

**Memory issues:**
```bash
# Check container resources
docker stats

# Increase Docker memory (Docker Desktop → Settings → Resources)
# Recommended: 8GB+ for Docker Desktop
```

#### Python Environment Problems:

**Package conflicts:**
```bash
# Reset conda environment
conda deactivate
conda env remove -n pathology-tutorials
conda env create -f environment.yml
```

**OpenSlide installation:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install openslide-tools python3-openslide

# macOS
brew install openslide

# Windows - download from https://openslide.org/download/
```

**Jupyter kernel issues:**
```bash
# Register kernel
python -m ipykernel install --user --name pathology-tutorials --display-name "Pathology Tutorials"

# List available kernels
jupyter kernelspec list
```

#### Data Download Issues:

**Network problems:**
```python
# Manual download fallback
import requests
from shared.utils import download_file_with_progress

url = "your_data_url_here"
local_path = "local_file_path"
download_file_with_progress(url, local_path)
```

**Disk space:**
```bash
# Check available space
df -h

# Clean up old data
rm -rf ./data/old_datasets/
docker system prune -a
```

### Performance Optimization

1. **System Resources:**
   - Minimum 8GB RAM for smooth operation
   - SSD recommended for faster I/O
   - Close unnecessary applications

2. **Jupyter Settings:**
   ```python
   # Add to notebook for large datasets
   import pandas as pd
   pd.set_option('display.max_rows', 100)
   pd.set_option('display.max_columns', 20)
   ```

3. **Memory Management:**
   ```python
   # Clear variables when done
   del large_dataset
   import gc
   gc.collect()
   ```

## 📖 Learning Path Recommendations

### Beginner Path (2-3 weeks):
1. Start with Image Processing Fundamentals (tutorials 1-4)
2. Move to Visualization and Statistics (tutorials 1-2)
3. Try basic Machine Learning (tutorial 1)

### Intermediate Path (4-6 weeks):
1. Complete all Image Processing tutorials
2. Finish Visualization tutorials (including UMAP)
3. Work through Machine Learning tutorials
4. Start with basic Deep Learning

### Advanced Path (2-3 months):
1. Complete all tutorial categories
2. Experiment with Foundation Models
3. Dive deep into Computational Pathology
4. Work with real WSI data

## 🤝 Contributing

### Adding New Tutorials:

1. **Fork and branch:**
   ```bash
   git checkout complete-notebooks
   git checkout -b feature/new-tutorial
   ```

2. **Create notebook:**
   - Use existing notebooks as templates
   - Include proper imports from `shared.utils`
   - Add comprehensive markdown documentation

3. **Test thoroughly:**
   - Run in clean environment
   - Verify data downloads work
   - Check all dependencies

4. **Submit PR:**
   - Include description of tutorial content
   - Add to this README
   - Update requirements if needed

### Guidelines:
- Use shared utilities for data management
- Include learning objectives and prerequisites
- Add autograding tests where appropriate
- Follow existing code style and structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenSlide project for WSI processing capabilities
- Jupyter ecosystem for interactive computing
- Scientific Python community for excellent libraries
- Digital pathology research community for datasets and methods

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/anand-indx/dp-t25/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anand-indx/dp-t25/discussions)
- **Documentation**: This README and inline notebook documentation

---

**Happy Learning! 🔬📊🤖**
