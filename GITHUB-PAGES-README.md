# GitHub Pages Deployment Setup

This branch contains the configuration for deploying the Digital Pathology Tutorial System to GitHub Pages **as a static learning platform**.

## 🚨 Important: GitHub Pages Limitations

**GitHub Pages serves only static content** - interactive Jupyter notebook execution is not possible directly on GitHub Pages. Here's how this deployment handles it:

### ✅ What Works on GitHub Pages:
- ✨ **Landing page** with course catalog and learning paths
- 📚 **Static HTML versions** of notebooks for reading/preview
- 🔗 **Launch buttons** for Google Colab and Binder integration
- 📖 **Learning resources** and external course links
- 📊 **Progress tracking** (stored locally in browser)

### ❌ What Doesn't Work on GitHub Pages:
- 🚫 **Interactive notebook execution** (requires server)
- 🚫 **Auto-checking/grading** with assert statements
- 🚫 **Local dataset downloads** (large files)
- 🚫 **JupyterLab environment** (needs backend)

## 📋 How Interactive Execution Works

Users can access notebooks in three ways:

1. **📖 Preview (Static HTML)**: Read-only view on GitHub Pages
2. **🔬 Google Colab**: Click "Open in Colab" for full interactivity
3. **📱 Local Setup**: Download and run with Docker/Jupyter locally

## 🔧 Technical Implementation

### Frontend Changes
- **Environment Detection**: App detects GitHub Pages vs local environment
- **Dynamic URLs**: Notebook links point to GitHub/Colab when on Pages
- **Launch Buttons**: Colab and GitHub view options for each tutorial
- **Static Resources**: External learning materials work universally

### Build Process
The GitHub Actions workflow:
1. **Converts notebooks** to HTML using `jupyter nbconvert`
2. **Builds React frontend** with proper GitHub Pages base path
3. **Copies static notebooks** to deployment directory
4. **Deploys to GitHub Pages** automatically

### Directory Structure After Build:
```
GitHub Pages Site/
├── index.html (React app)
├── static/ (CSS, JS bundles)
└── notebooks/
    ├── index.html (notebook catalog)
    ├── image-processing-tutorials/
    │   └── html/ (converted notebooks)
    └── visualization-tutorials/
        └── html/ (converted notebooks)
```

## 🚀 Deployment Instructions

### 1. Enable GitHub Pages
1. Go to repository **Settings → Pages**
2. **Source**: Select "**GitHub Actions**" (not "Deploy from branch")
3. Save settings

### 2. Automatic Deployment
- Pushes to `github-pages-deployment` branch trigger deployment
- Build takes ~3-5 minutes
- Site updates automatically at: **https://anand-indx.github.io/dp-t25/**

### 3. Manual Notebook Conversion (Optional)
```bash
# Install Jupyter if needed
pip install jupyter nbconvert

# Run conversion script
./scripts/convert-notebooks.sh

# Test locally
cd notebooks && python -m http.server 8000
# Open: http://localhost:8000
```

## 🔄 User Experience Flow

### On GitHub Pages:
1. **Browse learning paths** on landing page
2. **Read course descriptions** and prerequisites
3. **Preview notebooks** as static HTML
4. **Launch in Colab** for interactive execution
5. **Track progress** locally (browser storage)

### For Interactive Work:
1. **Click "Open in Colab"** from any tutorial
2. **Sign in to Google** (required for Colab)
3. **Run notebooks interactively** with GPU/TPU support
4. **Download datasets** directly in Colab environment
5. **Save work** to Google Drive or download

## 📊 External Integrations

### Google Colab
- **One-click launch** from any tutorial
- **Full Python environment** with pre-installed libraries
- **GPU/TPU access** available
- **Automatic dataset downloads** work in Colab

### Learning Resources
- **Python for Everybody (P4E)**: Free University of Michigan course
- **Kaggle Learn**: Interactive data science courses
- **Fast.ai & Coursera**: Advanced ML/DL courses
- **Research Papers**: Latest computational pathology research

## 🛡️ Safety & Rollback

### Branch Protection:
- **`main` branch**: Original Docker-based local development
- **`github-pages-deployment` branch**: GitHub Pages static version

### Rollback Options:
```bash
# Switch back to local development
git checkout main

# Delete Pages deployment branch
git branch -D github-pages-deployment
git push origin --delete github-pages-deployment

# Continue with Docker setup
docker compose up -d
```

## 📈 Analytics & Tracking

### What's Tracked:
- ✅ **Tutorial completion** (localStorage)
- ✅ **Task progress** (localStorage)
- ✅ **Learning path advancement** (localStorage)

### What's Not Tracked:
- ❌ **Code execution** (happens in Colab)
- ❌ **Actual learning outcomes** (no server-side data)
- ❌ **Cross-device sync** (localStorage only)

## 🌍 Live URLs

- **Main Site**: https://anand-indx.github.io/dp-t25/
- **Notebook Catalog**: https://anand-indx.github.io/dp-t25/notebooks/
- **GitHub Repository**: https://github.com/anand-indx/dp-t25

## 📝 Content Management

### Adding New Tutorials:
1. **Add notebook** to appropriate `notebooks/` directory
2. **Update tutorial array** in `apps/frontend/src/App.tsx`
3. **Add Colab/GitHub URLs** following existing pattern
4. **Push to `github-pages-deployment`** to deploy

### Updating Resources:
1. **Edit `learningResources` array** in `App.tsx`
2. **Add external course links** with clear CTAs
3. **Include duration estimates** and provider info
4. **Test links** before deployment

## 🎯 Best Practices

### For Users:
- 📱 **Bookmark the GitHub Pages site** for easy access
- 🔬 **Use Google Colab** for all interactive work
- 💾 **Save progress** by completing tutorials in order
- 🤝 **Join communities** linked in resources section

### For Developers:
- ✅ **Test locally** before pushing to deployment branch
- 📊 **Monitor build logs** in GitHub Actions
- 🔄 **Keep notebooks small** (large files don't work well in Colab)
- 📝 **Document external dependencies** clearly

---

**🎉 Result**: A professional, accessible learning platform that works for beginners and provides clear pathways to interactive computational pathology education!
