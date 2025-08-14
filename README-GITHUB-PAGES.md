# 🔬 Digital Pathology Tutorial System

[![GitHub Pages](https://github.com/anand-indx/dp-t25/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://anand-indx.github.io/dp-t25/)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/anand-indx/dp-t25/main?filepath=notebooks)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/anand-indx/dp-t25)

**🌐 Live Site**: https://anand-indx.github.io/dp-t25/

A comprehensive, interactive learning platform for digital pathology combining modern web technologies with Jupyter notebook tutorials. Learn image processing, machine learning, and deep learning techniques specifically designed for computational pathology.

## ✨ Features

- 🎯 **Progressive Learning Path**: 8 structured courses from beginner to expert level
- 🔬 **Real Pathology Data**: Work with CAMELYON16, GlaS Challenge, and other medical datasets  
- 🚀 **Multiple Execution Options**: Static preview, Google Colab, Binder, and JupyterLite
- 📊 **Interactive Dashboard**: Track progress and unlock courses based on prerequisites
- 🎓 **Expert-Designed Curriculum**: From basic image processing to foundation models
- 🌐 **GitHub Pages Hosted**: Accessible anywhere, no installation required

## 🚀 Quick Start Options

### 1. 🌐 Browse Online (GitHub Pages)
Visit the live site for course catalog and launch options:
**https://anand-indx.github.io/dp-t25/**

### 2. ☁️ Interactive Cloud Execution

#### Google Colab (Recommended)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/anand-indx/dp-t25)
- Full Python environment with GPU/TPU access
- Pre-installed libraries and datasets
- Best for learning and experimentation

#### Binder (Free Alternative)  
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/anand-indx/dp-t25/main?filepath=notebooks)
- Free cloud Jupyter environment
- Takes 1-2 minutes to launch
- Fully interactive with persistent session

#### JupyterLite (Browser-Only)
- Run Python directly in your browser
- No server required, instant launch
- Access via: https://anand-indx.github.io/dp-t25/lite/

### 3. 💻 Local Development
```bash
git clone https://github.com/anand-indx/dp-t25.git
cd dp-t25
docker compose up -d
# Access at: http://localhost:80
```

## 📚 Learning Path

### 🥇 **Beginner Level**
1. **Image Processing Basics** (2-3 hours)
   - Load and visualize medical images  
   - Resizing, cropping, and color conversion
   - Basic augmentation techniques
   - [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/anand-indx/dp-t25/blob/main/notebooks/image-processing-tutorials/notebooks/01_load_and_visualize.ipynb)

2. **Data Visualization & Analysis** (3-4 hours)
   - Pandas for pathology data
   - Statistical plotting and heatmaps
   - UMAP dimensionality reduction
   - [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/anand-indx/dp-t25/main?filepath=notebooks/visualization-tutorials)

### 🥈 **Intermediate Level**  
3. **Machine Learning Classification** (4-5 hours)
4. **Deep Learning with CNNs** (5-6 hours)

### 🥇 **Advanced Level**
5. **Whole Slide Image Analysis** (6-7 hours)  
6. **Computational Pathology Pipeline** (6-8 hours)

### 🏆 **Expert Level**
7. **Foundation Models** (8-10 hours)
8. **Spatial Transcriptomics** (8-10 hours)

## 🛠️ Technical Architecture

### Frontend (React + TypeScript)
- **Progressive Web App** with learning dashboard
- **Environment detection** for GitHub Pages vs local
- **Progress tracking** with localStorage persistence
- **Responsive design** for desktop and mobile

### Backend Options
- **GitHub Pages**: Static hosting with external execution
- **Docker**: Local JupyterLab + React development
- **Cloud**: Google Colab and Binder integration

### Notebook Deployment
- **Static HTML**: Auto-generated for preview
- **JupyterLite**: Browser-based execution
- **Cloud Launch**: One-click Colab/Binder buttons
- **Local Jupyter**: Full development environment

## 📖 Course Content

Each tutorial includes:
- 📝 **Learning objectives** and prerequisites
- 💻 **Interactive code cells** with explanations
- 📊 **Real pathology datasets** and visualizations
- ✅ **Auto-graded exercises** with assert statements
- 🎯 **Practical applications** and next steps

### Sample Topics:
- WSI processing and tiling strategies
- Color normalization (Macenko, Reinhard)
- Cancer detection with deep learning
- Foundation models (UNI, CONCH)
- Spatial analysis and morphometry
- Multiple Instance Learning (MIL)

## 🔧 Environment Setup

### Binder Environment
Automatically configured with `environment.yml`:
- Python 3.11 with scientific stack
- OpenCV, scikit-learn, matplotlib
- JupyterLab with widgets support

### Local Development
```bash
# Using Docker (recommended)
docker compose up -d

# Using Python virtual environment  
pip install -r requirements.txt
jupyter lab
```

## 🤝 Contributing

### Adding New Tutorials
1. Create notebook in appropriate `/notebooks` directory
2. Add metadata and launch badges to README
3. Update course array in `apps/frontend/src/App.tsx`
4. Test all execution methods (Colab, Binder, JupyterLite)

### Development Workflow
- **`main` branch**: Stable local Docker setup
- **`github-pages-deployment` branch**: Static site deployment
- **Pull requests**: Welcome for content and feature improvements

## 📊 Analytics & Progress

### What's Tracked:
- ✅ Course completion and progress
- ✅ Learning path advancement
- ✅ Time spent on tutorials (estimated)

### Privacy:
- 🔒 **No server-side tracking**: All data stored locally
- 🔒 **No personal information**: Just learning progress
- 🔒 **GDPR compliant**: User controls their own data

## 🎓 Learning Resources

The platform includes curated external resources:
- **Python for Everybody (P4E)**: Free University of Michigan course
- **Kaggle Learn**: Interactive data science courses  
- **Fast.ai**: Practical deep learning
- **Research Papers**: Latest computational pathology advances
- **Community Support**: Stack Overflow, Reddit, Kaggle forums

## 🌟 Success Stories

> *"This platform took me from basic Python to publishing my first computational pathology paper in 6 months!"* - Graduate Student

> *"The progressive unlocking kept me motivated, and the Colab integration made it so easy to start coding immediately."* - Pathology Resident

## 📞 Support

- 📧 **Issues**: [GitHub Issues](https://github.com/anand-indx/dp-t25/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/anand-indx/dp-t25/discussions)  
- 🔗 **Community**: Join our learning resources section for forums and chat

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**🎉 Ready to start your digital pathology journey?** 
**Visit: https://anand-indx.github.io/dp-t25/**

[![Launch Tutorial System](https://img.shields.io/badge/Launch-Tutorial%20System-blue?style=for-the-badge&logo=jupyter)](https://anand-indx.github.io/dp-t25/)
