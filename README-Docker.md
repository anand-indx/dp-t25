# 🔬 Digital Pathology Tutorial System (Docker Version)

A comprehensive, interactive learning platform for digital pathology image processing with Docker deployment.

## 🚀 Quick Start (Docker)

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB of available RAM
- Modern web browser (Chrome, Firefox, Safari, Edge)

### One-Command Setup
```bash
# Clone and start the system
git clone <repository-url>
cd dp-t25
./start-docker.sh
```

### Manual Docker Setup
```bash
# Start the system
docker compose up -d

# Stop the system
docker compose down

# Rebuild containers (if you made changes)
docker compose up --build -d
```

## 📍 Access URLs

Once started, the system will be available at:

- **🌐 Main Tutorial Interface**: http://localhost:3000
- **📓 JupyterLab Environment**: http://localhost:8888/lab

## 🎯 How to Use

1. **Visit the main interface** at http://localhost:3000
2. **Browse available tutorials** in the "Image Processing Fundamentals" section
3. **Click on any learning task** to open interactive Jupyter notebooks
4. **Complete tutorials 1-4** in sequential order:
   - Load and visualize histopathology images
   - Perform image resizing and grayscale conversion
   - Apply basic augmentation techniques
   - Implement color normalization
5. **Run autograding tests** using the 🎯 autograding notebook to check progress

## ✨ Features

### 🔧 Docker Benefits
- **One-command startup**: No complex environment setup
- **Isolated environment**: No conflicts with your system
- **Consistent experience**: Works the same on any machine
- **Easy cleanup**: Stop containers when done

### 📚 Learning Features
- **Interactive Notebooks**: Full JupyterLab environment with Python kernel
- **Auto-download**: Sample data downloads automatically when needed
- **Progress Tracking**: Autograding system validates your work
- **Real Datasets**: Work with actual histopathology images
- **Step-by-step Learning**: Guided tutorials from basics to advanced

### 🛠️ Technical Features
- **React Frontend**: Modern, responsive tutorial interface
- **JupyterLab Backend**: Full-featured notebook environment
- **Docker Networking**: Services communicate seamlessly
- **Volume Mounting**: Your work is preserved between sessions

## 📁 System Architecture

```
dp-t25/
├── docker-compose.yml          # Container orchestration
├── Dockerfile.frontend         # React app container
├── Dockerfile.jupyter         # JupyterLab container
├── start-docker.sh            # Quick startup script
├── src/                       # React app source
├── image-processing-tutorials/ # Tutorial notebooks
│   ├── notebooks/             # Interactive tutorials
│   │   ├── 01_load_and_visualize.ipynb
│   │   ├── 02_resizing_and_grayscale.ipynb
│   │   ├── 03_basic_augmentation.ipynb
│   │   ├── 04_color_normalization.ipynb
│   │   └── test_autograding.ipynb
│   └── data/                  # Sample datasets (auto-downloaded)
└── public/                    # Static web assets
```

## 🔧 Container Details

### Frontend Container
- **Base**: Node.js 18 Alpine
- **Port**: 3000 (external) → 5173 (internal)
- **Features**: React + Vite development server
- **Environment**: Configurable JupyterLab URL

### Jupyter Container
- **Base**: Miniconda3 with Python 3.11
- **Port**: 8888 (bidirectional)
- **Features**: JupyterLab + scientific packages
- **Packages**: OpenSlide, PIL, NumPy, Matplotlib, etc.
- **Volume**: Tutorial notebooks mounted for persistence

## 🐛 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :8888

# Kill conflicting processes
docker compose down
pkill -f "docker"
```

**Containers won't start:**
```bash
# Check container logs
docker compose logs frontend
docker compose logs jupyter

# Restart with fresh build
docker compose down
docker compose up --build -d
```

**Notebooks won't open:**
- Ensure JupyterLab container is running: `docker compose ps`
- Check JupyterLab logs: `docker compose logs jupyter`
- Verify notebooks exist: `ls image-processing-tutorials/notebooks/`

### Performance Tips

- **Free up memory**: Close unused browser tabs
- **Check resources**: `docker stats` to monitor container usage
- **Restart if slow**: `docker compose restart`

## 🛑 Stopping the System

```bash
# Stop containers (preserves data)
docker compose down

# Stop and remove everything including volumes
docker compose down -v

# Remove built images (if you want to start completely fresh)
docker compose down --rmi all
```

## 📊 System Requirements

**Minimum:**
- 4GB RAM
- 2GB free disk space
- Docker 20.10+
- Docker Compose 2.0+

**Recommended:**
- 8GB RAM
- 5GB free disk space
- Modern multi-core CPU
- SSD storage

## 🎓 Learning Path

1. **Start with Tutorial 1**: Basic image loading and visualization
2. **Progress to Tutorial 2**: Image manipulation techniques
3. **Continue to Tutorial 3**: Data augmentation methods
4. **Complete Tutorial 4**: Advanced color normalization
5. **Validate Progress**: Run the autograding notebook
6. **Experiment**: Modify notebooks and try your own ideas

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review container logs: `docker compose logs`
3. Ensure Docker is running properly
4. Try restarting: `docker compose restart`

## 🔒 Security Note

This Docker setup disables JupyterLab authentication for ease of use in learning environments. **Do not expose port 8888 to public networks** in production environments.

---

**Ready to start learning?** Run `./start-docker.sh` and open http://localhost:3000! 🚀
