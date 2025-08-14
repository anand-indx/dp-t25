# GitHub Pages Deployment Setup

This branch contains the configuration for deploying the Digital Pathology Tutorial System to GitHub Pages.

## What's Different in This Branch

1. **GitHub Actions Workflow**: `.github/workflows/deploy-github-pages.yml` - Automatically builds and deploys the frontend to GitHub Pages
2. **Vite Configuration**: Updated `apps/frontend/vite.config.ts` with proper base path for GitHub Pages
3. **Environment Detection**: Frontend now detects if it's running on GitHub Pages and adjusts URLs accordingly
4. **Resource Links**: When deployed on GitHub Pages, Jupyter notebook links point to GitHub repository instead of local Jupyter server

## Deployment Process

1. The GitHub Actions workflow triggers on push to `main` branch
2. It builds the React frontend using Node.js 18
3. Uploads the built files to GitHub Pages
4. The site becomes available at: `https://anand-indx.github.io/dp-t25/`

## GitHub Pages Settings Required

To enable GitHub Pages deployment, you need to:

1. Go to your GitHub repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy when you push to main

## Local Development vs GitHub Pages

- **Local Development**: Jupyter notebooks run in your local JupyterLab environment
- **GitHub Pages**: Jupyter notebook links point to GitHub repository for viewing
- **Resources Section**: All external learning resources work the same in both environments

## Branch Protection

The original working version remains safe in the `main` branch. This `github-pages-deployment` branch contains all the GitHub Pages specific modifications.

## Live URL

Once deployed, your tutorial system will be available at:
**https://anand-indx.github.io/dp-t25/**

## Rollback

If anything goes wrong, you can always:
1. Switch back to main branch: `git checkout main`
2. Delete this branch: `git branch -D github-pages-deployment`
3. Continue with your local Docker setup as before
