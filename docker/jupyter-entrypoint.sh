#!/bin/bash

# Create symlinks for notebooks to be accessible from root workspace
echo "Creating notebook symlinks..."

# Image processing tutorials
ln -sf /workspace/notebooks/image-processing-tutorials/notebooks/01_load_and_visualize.ipynb /workspace/01_load_and_visualize.ipynb
ln -sf /workspace/notebooks/image-processing-tutorials/notebooks/02_resizing_and_grayscale.ipynb /workspace/02_resizing_and_grayscale.ipynb  
ln -sf /workspace/notebooks/image-processing-tutorials/notebooks/03_basic_augmentation.ipynb /workspace/03_basic_augmentation.ipynb
ln -sf /workspace/notebooks/image-processing-tutorials/notebooks/04_color_normalization.ipynb /workspace/04_color_normalization.ipynb
ln -sf /workspace/notebooks/image-processing-tutorials/notebooks/test_autograding.ipynb /workspace/test_autograding.ipynb

# Visualization tutorials (with viz_ prefix to avoid conflicts)
ln -sf /workspace/notebooks/visualization-tutorials/notebooks/01_pandas_pathology.ipynb /workspace/viz_01_pandas_pathology.ipynb
ln -sf /workspace/notebooks/visualization-tutorials/notebooks/02_statistical_plots.ipynb /workspace/viz_02_statistical_plots.ipynb
ln -sf /workspace/notebooks/visualization-tutorials/notebooks/03_heatmaps_correlation.ipynb /workspace/viz_03_heatmaps_correlation.ipynb
ln -sf /workspace/notebooks/visualization-tutorials/notebooks/04_umap_dimensionality.ipynb /workspace/viz_04_umap_dimensionality.ipynb

echo "Symlinks created successfully!"

# Start JupyterLab
exec jupyter lab --config=/home/jupyter/.jupyter/jupyter_lab_config.py
