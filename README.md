# 🔬 Digital Pathology Tutorials

A modern, interactive tutorial system for digital pathology and computational pathology using Docker and JupyterLab.

## 🚀 Quick Start

```bash
# Clone and start
git clone https://github.com/anand-indx/dp-t25.git
cd dp-t25
./start.sh

# Access tutorials
# Web Interface: http://localhost:3000
# JupyterLab: http://localhost:8888
```

## 📋 Branches

- **`main`**: Clean Docker-based system for quick demos and development
- **`complete-notebooks`**: Full offline environment with all dependencies and datasets

## 🎯 Choose Your Path

### For Quick Exploration (main branch)
- **Docker-based setup** - runs in minutes
- **Streamlined notebooks** - core concepts only
- **Cloud integration** - works with Colab/Binder
- **Perfect for**: Workshops, demos, getting started

### For Complete Learning (complete-notebooks branch)
- **Full local environment** - everything included
- **Comprehensive tutorials** - advanced topics covered
- **Offline capability** - all datasets pre-downloaded
- **Perfect for**: Self-paced learning, research, development

```bash
# Switch to complete environment
git checkout complete-notebooks
./setup-complete.sh
```

## ✨ Features

- **One-Command Setup**: Docker-based deployment in minutes
- **Interactive Notebooks**: Modern JupyterLab environment
- **Web Dashboard**: React-based tutorial navigation
- **Cloud Integration**: Works with Colab, Binder, and local environments
- **Modular Architecture**: Easy to extend and customize

## � Tutorial Categories

### Core Topics (Available in main branch)
- **Image Processing Fundamentals**: Loading, transforming, and analyzing histopathology images
- **Visualization**: Statistical plots, heatmaps, and correlation analysis  
- **Machine Learning**: Feature extraction, classical ML, and model evaluation
- **Deep Learning**: CNNs, training, and model evaluation

### Advanced Topics (complete-notebooks branch only)
- **Foundation Models**: Pre-trained models, feature extraction, zero-shot learning
- **Computational Pathology**: WSI processing, stain normalization, segmentation
- **Multiple Instance Learning**: Slide-level analysis and weakly supervised learning
- **Advanced Visualization**: UMAP, dimensionality reduction, interactive plots

## ⚡ Quick Setup (Docker)

### Prerequisites
- Docker Desktop installed
- 4GB+ RAM available
- Modern web browser

### Start the System
```bash
git clone https://github.com/anand-indx/dp-t25.git
cd dp-t25
./start.sh
```

### Access Points
- **Web Dashboard**: http://localhost:3000
## 🛠️ System Architecture

```
┌─────────────────┐    ┌──────────────────┐
│   Frontend      │    │   JupyterLab     │
│   (React/Vite)  │◄──►│   (Python Env)   │
│   Port: 3000    │    │   Port: 8888     │
└─────────────────┘    └──────────────────┘
         │                       │
         └───────────────────────┘
              Docker Network
              
Data: ./notebooks → /workspace/notebooks
Utils: ./shared → /workspace/shared
```

## 🔧 Commands

```bash
# Start system
./start.sh

# Stop system
./stop.sh

# View logs
docker compose logs

# Rebuild (after changes)
docker compose up --build -d

# Clean reset
docker compose down -v
```

## 📊 Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4GB | 8GB+ |
| Storage | 2GB | 5GB+ |
| Docker | 20.10+ | Latest |
| Compose | 2.0+ | Latest |

## 🧪 Validation

Test your setup:
```bash
# Check containers
docker compose ps

# Test notebook access
curl http://localhost:8888/api

# Run a tutorial
# Open browser → localhost:3000 → Click any tutorial
```

## � Documentation

- **Quick Start**: This README
- **Complete Setup**: Switch to `complete-notebooks` branch for full documentation
- **Docker Details**: `README-Docker.md`
- **GitHub Pages**: `README-GITHUB-PAGES.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in both Docker and complete environments
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Support

- **Issues**: [GitHub Issues](https://github.com/anand-indx/dp-t25/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anand-indx/dp-t25/discussions)

---

**Ready to explore digital pathology? Start with `./start.sh` and visit http://localhost:3000! 🔬**
