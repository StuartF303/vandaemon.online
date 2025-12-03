# Deployment Guide

This document describes how to deploy the vandaemon marketing website to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed locally
- This repository initialized with Git

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Set repository name: `vandaemon.online`
3. Set owner: `stuartf303`
4. Set visibility: Public (required for GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Add Remote and Push

From your local project directory, run:

```bash
git remote add origin https://github.com/stuartf303/vandaemon.online.git
git branch -M master
git push -u origin master
```

## Step 3: Enable GitHub Pages

1. Go to repository Settings → Pages
2. Under "Build and deployment":
   - Source: GitHub Actions
3. The deployment workflow will automatically run
4. Wait 1-2 minutes for the deployment to complete
5. Your site will be available at: https://stuartf303.github.io/vandaemon.online/

## Step 4: Configure Custom Domain (Optional)

If you want to use the custom domain `vandaemon.online`:

1. In your domain registrar's DNS settings, add:
   - Type: CNAME
   - Name: www (or @)
   - Value: stuartf303.github.io

2. In GitHub repository Settings → Pages:
   - Enter custom domain: `vandaemon.online`
   - Check "Enforce HTTPS"

3. Update the canonical URL in `index.html`:
   ```html
   <link rel="canonical" href="https://vandaemon.online/">
   ```

## Step 5: Configure Google Analytics

1. Create a Google Analytics 4 property at https://analytics.google.com
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Update the following files:
   - `index.html`: Replace `G-XXXXXXXXXX` in the gtag script (line 40)
   - `js/analytics.js`: Replace `G-XXXXXXXXXX` in the config (line 10)
4. Commit and push the changes

## Automatic Deployments

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy the site whenever you push to the master branch.

## Testing Locally

To test the site locally before deploying:

1. Use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (if you have npx)
   npx http-server
   ```

2. Open http://localhost:8000 in your browser

## Troubleshooting

### Deployment fails
- Check GitHub Actions tab for error messages
- Ensure repository is public
- Verify GitHub Pages is enabled in Settings

### Site shows 404
- Wait a few minutes for DNS propagation
- Clear browser cache
- Check that index.html is in the root directory

### Analytics not working
- Verify Measurement ID is correct
- Check browser console for errors
- Use Google Analytics DebugView to test events
