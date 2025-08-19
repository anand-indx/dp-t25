# Digital Pathology Tutorials - Notebooks Collection

A comprehensive collection of Jupyter notebooks covering digital pathology, computational pathology, machine learning, and medical image analysis. These tutorials provide hands-on experience with real-world applications in pathology research and practice.

## 📚 Tutorial Categories

### 🖼️ Image Processing Tutorials
Basic image processing techniques for medical images:
- **01_load_and_visualize.ipynb** - Loading and visualizing medical images
- **02_resizing_and_grayscale.ipynb** - Image resizing and grayscale conversion
- **03_basic_augmentation.ipynb** - Data augmentation techniques
- **04_color_normalization.ipynb** - Color normalization methods

### 🔬 Computational Pathology Tutorials
Advanced pathology-specific techniques:
- **01_wsi_tiling_openslide.ipynb** - Whole slide image processing with OpenSlide
- **02_stain_normalization_macenko_vahadane.ipynb** - Histological stain normalization
- **03_nuclei_segmentation_tiatoolbox.ipynb** - Cell nuclei segmentation using TIAToolbox
- **04_slide_level_MIL_intro.ipynb** - Multiple Instance Learning for slide-level analysis

### 🧠 Deep Learning Tutorials
Modern deep learning approaches:
- **01_cnn_architecture.ipynb** - Convolutional Neural Network fundamentals
- **02_data_augmentation.ipynb** - Advanced data augmentation for medical images
- **03_model_training.ipynb** - Training deep learning models
- **04_hyperparameter_optimization.ipynb** - Hyperparameter tuning strategies
- **05_explainability_gradcam.ipynb** - Model interpretability with Grad-CAM
- **06_multiple_instance_learning_mil.ipynb** - Multiple Instance Learning implementation

### 🤖 Foundation Models Tutorials
Pre-trained model applications:
- **01_foundation_models_overview.ipynb** - Introduction to foundation models
- **02_feature_extraction_timm_histology.ipynb** - Feature extraction using TIMM
- **03_zero_shot_clip_histology.ipynb** - Zero-shot learning with CLIP

### 📊 Machine Learning Tutorials
Classical ML approaches:
- **01_feature_extraction.ipynb** - Traditional feature extraction methods
- **02_classical_ml.ipynb** - Classical machine learning algorithms
- **03_model_evaluation.ipynb** - Model evaluation metrics and techniques
- **04_cross_validation.ipynb** - Cross-validation strategies

### 📈 Visualization Tutorials
Data visualization and exploration:
- **01_pandas_pathology.ipynb** - Data manipulation with Pandas
- **02_statistical_plots.ipynb** - Statistical visualization techniques
- **03_heatmaps_correlation.ipynb** - Heatmaps and correlation analysis
- **04_umap_dimensionality.ipynb** - Dimensionality reduction with UMAP

### 🔍 WSI Tutorials
Whole Slide Image analysis:
- **01_read_visualize_wsi.ipynb** - Reading and visualizing whole slide images
- **02_patch_extraction.ipynb** - Extracting patches from WSI
- **03_heatmap_overlay.ipynb** - Creating overlay heatmaps

### 🧬 Spatial Tutorials
Spatial analysis techniques:
- **01_spatial_transcriptomics_basics.ipynb** - Introduction to spatial transcriptomics

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Git

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dp-t25.git
   cd dp-t25
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   
   # On Linux/macOS:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Launch Jupyter Lab:**
   ```bash
   jupyter lab
   ```

5. **Navigate to notebooks:**
   Open the `notebooks/` directory in Jupyter Lab and select the tutorial category you want to explore.

## 📁 Repository Structure

```
dp-t25/
├── notebooks/                    # All tutorial notebooks organized by category
│   ├── image-processing-tutorials/
│   ├── comp-pathology-tutorials/
│   ├── deep-learning-tutorials/
│   ├── foundation-models-tutorials/
│   ├── ml-tutorials/
│   ├── visualization-tutorials/
│   ├── wsi-tutorials/
│   └── spatial-tutorials/
├── shared/                       # Shared utility functions
│   ├── utils.py                 # Common utility functions
│   └── validation.py            # Validation helpers
├── requirements.txt             # Python dependencies
├── environment.yml              # Conda environment file
└── README.md                    # This file
```

## 🔧 Key Dependencies

- **Jupyter Lab** - Interactive notebook environment
- **NumPy & Pandas** - Data manipulation and analysis
- **Matplotlib & Seaborn** - Data visualization
- **OpenCV & Scikit-image** - Image processing
- **PyTorch** - Deep learning framework
- **OpenSlide** - Whole slide image processing
- **TIAToolbox** - Computational pathology toolkit
- **UMAP** - Dimensionality reduction

## 💡 Usage Tips

1. **Start with basics:** Begin with image processing tutorials if you're new to medical imaging
2. **Progressive learning:** Follow the numbered sequence within each category
3. **Hands-on practice:** Run each cell and experiment with parameters
4. **Resource requirements:** Some deep learning tutorials may require substantial computational resources

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or issues
- Suggest new tutorial topics
- Submit improvements to existing notebooks
- Add documentation

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🆘 Support

If you encounter issues:
1. Check that all dependencies are properly installed
2. Ensure you're using a compatible Python version (3.8+)
3. For specific notebook issues, check the notebook's markdown cells for additional instructions
4. Create an issue in the repository for persistent problems

---

**Happy Learning! 🎓**
