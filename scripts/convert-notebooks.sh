#!/bin/bash

# Convert Jupyter notebooks to HTML for GitHub Pages deployment
echo "Converting Jupyter notebooks to HTML..."

# Create HTML directories
find notebooks -type d -name "notebooks" | while read dir; do
    html_dir="${dir}/html"
    mkdir -p "$html_dir"
    echo "Created $html_dir"
done

# Convert all .ipynb files to HTML
find notebooks -name "*.ipynb" -not -path "*/.*" -not -path "*/html/*" | while read notebook; do
    echo "Converting: $notebook"
    dir=$(dirname "$notebook")
    filename=$(basename "$notebook" .ipynb)
    
    # Create HTML subdirectory if it doesn't exist
    html_dir="$dir/html"
    mkdir -p "$html_dir"
    
    # Convert notebook to HTML
    jupyter nbconvert --to html "$notebook" --output-dir "$html_dir"
    
    if [ $? -eq 0 ]; then
        echo "✓ Converted: $notebook → $html_dir/${filename}.html"
    else
        echo "✗ Failed to convert: $notebook"
    fi
done

# Create index files for navigation
echo "Creating navigation index files..."

# Create main notebooks index
cat > notebooks/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Pathology Tutorials</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .tutorial-section { margin-bottom: 30px; padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px; }
        .notebook-list { list-style: none; padding: 0; }
        .notebook-list li { margin: 10px 0; }
        .notebook-list a { text-decoration: none; color: #0969da; }
        .notebook-list a:hover { text-decoration: underline; }
        .launch-buttons { margin-top: 10px; }
        .launch-buttons a { display: inline-block; margin-right: 10px; padding: 5px 10px; background: #f6f8fa; border: 1px solid #d1d9e0; border-radius: 6px; text-decoration: none; color: #24292f; font-size: 12px; }
        .launch-buttons a:hover { background: #f3f4f6; }
        .colab { background: #f97316 !important; color: white !important; }
    </style>
</head>
<body>
    <h1>🔬 Digital Pathology Jupyter Tutorials</h1>
    <p>Interactive tutorials for learning computational pathology with Python.</p>
    
    <div class="tutorial-section">
        <h2>📊 Image Processing Tutorials</h2>
        <ul class="notebook-list">
            <li>
                <a href="image-processing-tutorials/html/01_load_and_visualize.html">01 - Load and Visualize Medical Images</a>
                <div class="launch-buttons">
                    <a href="https://colab.research.google.com/github/anand-indx/dp-t25/blob/main/notebooks/image-processing-tutorials/notebooks/01_load_and_visualize.ipynb" class="colab">Open in Colab</a>
                    <a href="https://github.com/anand-indx/dp-t25/blob/main/notebooks/image-processing-tutorials/notebooks/01_load_and_visualize.ipynb">View on GitHub</a>
                </div>
            </li>
            <li>
                <a href="image-processing-tutorials/html/02_resizing_and_grayscale.html">02 - Image Resizing and Grayscale Conversion</a>
                <div class="launch-buttons">
                    <a href="https://colab.research.google.com/github/anand-indx/dp-t25/blob/main/notebooks/image-processing-tutorials/notebooks/02_resizing_and_grayscale.ipynb" class="colab">Open in Colab</a>
                    <a href="https://github.com/anand-indx/dp-t25/blob/main/notebooks/image-processing-tutorials/notebooks/02_resizing_and_grayscale.ipynb">View on GitHub</a>
                </div>
            </li>
        </ul>
    </div>
    
    <div class="tutorial-section">
        <h2>📈 Visualization Tutorials</h2>
        <ul class="notebook-list">
            <li>
                <a href="visualization-tutorials/html/">Visualization Notebooks</a>
                <div class="launch-buttons">
                    <a href="https://github.com/anand-indx/dp-t25/tree/main/notebooks/visualization-tutorials">Browse on GitHub</a>
                </div>
            </li>
        </ul>
    </div>
    
    <p><strong>Note:</strong> HTML versions are for preview only. For interactive execution, click "Open in Colab" or download and run locally with Jupyter.</p>
</body>
</html>
EOF

echo "✓ Created notebooks/index.html"

echo ""
echo "🎉 Notebook conversion complete!"
echo "📁 HTML files are in: notebooks/*/html/"
echo "🌐 Main index: notebooks/index.html"
echo ""
echo "To test locally:"
echo "  cd notebooks && python -m http.server 8000"
echo "  Open: http://localhost:8000"
