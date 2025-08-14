# Image Processing Tutorials

This directory contains a series of Jupyter Notebooks designed to teach the fundamentals of image processing for digital pathology.

## Structure

- `data/`: This directory is intended to store sample images required for the tutorials. You will need to download the necessary datasets and place them here. For example, create a `camelyon16` subdirectory for data from the CAMELYON16 challenge.
- `notebooks/`: Contains the tutorial notebooks. They are numbered in the recommended order.
- `tests/`: Contains an autograding notebook that you can run to check your work from the tutorial notebooks.

## Getting Started

1.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    (A `requirements.txt` file should be created with the necessary packages like `jupyter`, `openslide-python`, `Pillow`, `matplotlib`, `numpy`, `ipynb`).

2.  **Download Data:** Download the required image data and place it in the `data` directory.

3.  **Run the Notebooks:** Start with `01_load_and_visualize.ipynb` and work your way through the series.

4.  **Check Your Work:** Run the `tests/test_autograding.ipynb` notebook to see if you have successfully completed the tasks.
