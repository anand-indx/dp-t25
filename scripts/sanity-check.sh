#!/bin/bash

echo "🔍 Digital Pathology Platform - Deployment Sanity Check"
echo "======================================================="

echo ""
echo "📁 Checking file structure..."

# Check critical files
files=("apps/frontend/package.json" "apps/frontend/vite.config.ts" ".github/workflows/deploy-github-pages.yml" "environment.yml" "requirements.txt" "jupyterlite.json")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - EXISTS"
    else
        echo "❌ $file - MISSING"
    fi
done

echo ""
echo "📊 Checking notebook files..."
notebook_count=$(find notebooks -name "*.ipynb" -not -path "*/.ipynb_checkpoints/*" | wc -l)
echo "Found $notebook_count notebook files"

if [ $notebook_count -gt 0 ]; then
    echo "✅ Notebooks found"
    echo "Sample notebooks:"
    find notebooks -name "*.ipynb" -not -path "*/.ipynb_checkpoints/*" | head -3
else
    echo "❌ No notebooks found"
fi

echo ""
echo "🔧 Checking configuration files..."

# Check Vite config has correct base path
if grep -q "/dp-t25/" apps/frontend/vite.config.ts; then
    echo "✅ Vite config - GitHub Pages base path configured"
else
    echo "❌ Vite config - Missing GitHub Pages base path"
fi

# Check GitHub Actions workflow
if grep -q "github-pages-deployment" .github/workflows/deploy-github-pages.yml; then
    echo "✅ GitHub Actions - Triggers on correct branch"
else
    echo "❌ GitHub Actions - Incorrect branch trigger"
fi

# Check environment files
if [ -f "environment.yml" ] && [ -f "requirements.txt" ]; then
    echo "✅ Environment files - Both Conda and pip configs present"
else
    echo "❌ Environment files - Missing dependency configurations"
fi

echo ""
echo "🌐 Checking deployment readiness..."

# Check if we're on the right branch
current_branch=$(git branch --show-current)
if [ "$current_branch" = "github-pages-deployment" ]; then
    echo "✅ Git branch - On deployment branch"
else
    echo "⚠️  Git branch - Currently on '$current_branch', should be 'github-pages-deployment'"
fi

# Check for uncommitted changes
if git diff-index --quiet HEAD --; then
    echo "✅ Git status - No uncommitted changes"
else
    echo "⚠️  Git status - Uncommitted changes detected"
fi

echo ""
echo "📋 Summary of execution methods:"
echo "1. 📖 Static HTML preview (GitHub Pages)"
echo "2. ☁️  Google Colab (recommended)"  
echo "3. 🚀 Binder (free cloud)"
echo "4. 💻 JupyterLite (browser-only)"

echo ""
echo "🎯 Next steps:"
echo "1. Commit any remaining changes"
echo "2. Push to github-pages-deployment branch"
echo "3. Enable GitHub Pages in repository settings"
echo "4. Select 'GitHub Actions' as deployment source"

echo ""
echo "✅ Sanity check complete!"
