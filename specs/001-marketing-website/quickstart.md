# Quickstart Guide: Vandaemon Marketing Website

**Feature**: 001-marketing-website
**Last Updated**: 2025-12-03

This guide helps developers set up, develop, test, and deploy the vandaemon marketing website.

---

## Prerequisites

- Git installed
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor or IDE (VS Code, Sublime Text, etc.)
- Google Analytics account (for GA4 Measurement ID)
- GitHub account with access to the repository

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/stuartf303/vandaemon.online.git
cd vandaemon.online
```

### 2. Open in Browser

Since this is a static site, no build process or local server is required:

```bash
# Option 1: Open directly in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux

# Option 2: Use a simple HTTP server (optional, for testing)
python3 -m http.server 8000
# Then visit http://localhost:8000 in your browser
```

### 3. Make Changes

Edit HTML, CSS, or JavaScript files in your preferred editor:

- `index.html` - Main homepage content
- `css/main.css` - Core styles (mobile-first)
- `css/responsive.css` - Media queries for tablet/desktop
- `css/accessibility.css` - A11y enhancements
- `js/analytics.js` - Google Analytics configuration
- `js/navigation.js` - Optional navigation interactions

### 4. Test Locally

**Responsiveness**:
1. Open Chrome DevTools (F12 or Ctrl+Shift+I)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test different devices: iPhone 12, iPad, Desktop HD

**Accessibility**:
1. Install [aXe DevTools](https://www.deque.com/axe/devtools/) browser extension
2. Run aXe scan on each page
3. Fix any critical or serious violations

**Performance**:
1. Open Chrome DevTools → Lighthouse tab
2. Run audit with "Performance, Accessibility, SEO" checked
3. Aim for 90+ scores in all categories

---

## Google Analytics Setup

### 1. Create GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new property: "Vandaemon Marketing Site"
3. Create Data Stream: Web → Enter site URL
4. Copy Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Add Measurement ID

Edit `js/analytics.js` and replace placeholder:

```javascript
// Replace 'G-XXXXXXXXXX' with your actual Measurement ID
gtag('config', 'G-XXXXXXXXXX', {
  'anonymize_ip': true,
  'cookie_flags': 'SameSite=None;Secure'
});
```

### 3. Verify Tracking

1. Open site in browser with `index.html` file
2. Open GA4 Real-time reports: Reports → Realtime
3. Should see 1 active user (you)
4. Click demo/GitHub links to verify events fire

---

## Testing Checklist

Run through this checklist before committing changes:

### Functionality

- [ ] All links work (demo, GitHub, docs)
- [ ] External links open in new tab (`target="_blank"`)
- [ ] Mobile navigation toggle works (if applicable)
- [ ] Forms submit correctly (if applicable)
- [ ] No console errors in browser DevTools

### Responsiveness

- [ ] Mobile (320px): Content readable, no horizontal scroll
- [ ] Mobile (375px): iPhone SE, iPhone 12 layouts correct
- [ ] Tablet (768px): iPad portrait layout correct
- [ ] Desktop (1024px): Multi-column layout works
- [ ] Wide (1440px+): Content doesn't stretch too wide

### Accessibility

- [ ] All images have alt text
- [ ] Heading hierarchy correct (h1 → h2 → h3, no skips)
- [ ] Keyboard navigation works (Tab through all interactive elements)
- [ ] Focus indicators visible (try navigating with Tab key)
- [ ] aXe DevTools shows no critical/serious violations
- [ ] Screen reader announces content logically (test with NVDA/VoiceOver)

### Performance

- [ ] Lighthouse Performance score: 90+
- [ ] Lighthouse Accessibility score: 90+
- [ ] Lighthouse SEO score: 90+
- [ ] Images optimized (WebP format, <200KB each)
- [ ] Total page weight: <500KB
- [ ] No render-blocking resources

### SEO & Social

- [ ] Page title descriptive (<60 characters)
- [ ] Meta description present (150-160 characters)
- [ ] Open Graph tags present (og:title, og:description, og:image)
- [ ] Twitter Card tags present (twitter:card, twitter:title, etc.)
- [ ] Test social preview: [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter preview: [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Analytics

- [ ] GA4 Measurement ID configured
- [ ] Real-time tracking works (1 active user visible)
- [ ] Custom events fire correctly:
  - [ ] `demo_click` when clicking demo link
  - [ ] `github_click` when clicking GitHub link
  - [ ] `docs_click` when clicking documentation links
- [ ] No GA4 errors in browser console

---

## Cross-Browser Testing

Test on multiple browsers to ensure compatibility:

### Required Browsers

| Browser | Version | Platform |
|---------|---------|----------|
| Chrome | Latest | Windows/macOS/Linux |
| Firefox | Latest | Windows/macOS/Linux |
| Safari | Latest | macOS/iOS |
| Edge | Latest | Windows |

### Testing Steps

1. Open site in each browser
2. Verify layout renders correctly
3. Test all interactive elements (links, buttons, forms)
4. Check console for errors
5. Verify mobile layouts on iOS Safari and Android Chrome (real devices preferred)

---

## Deployment to GitHub Pages

### 1. Commit and Push Changes

```bash
git add .
git commit -m "Add vandaemon marketing website"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to repository on GitHub: `github.com/stuartf303/vandaemon.online`
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` → `/ (root)` → Save
5. Wait 1-2 minutes for deployment

### 3. Verify Deployment

- Visit `https://<username>.github.io/vandaemon.online/`
- Verify site loads correctly
- Test all links and functionality
- Check GA4 Real-time reports for activity

### 4. Custom Domain (Optional)

If using a custom domain (e.g., `vandaemon.com`):

1. Add `CNAME` file to repository root:
   ```
   vandaemon.com
   ```

2. Configure DNS with your domain registrar:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

3. Add custom domain in GitHub Settings → Pages → Custom domain
4. Enable "Enforce HTTPS" (wait for certificate provisioning)

---

## Continuous Integration (Lighthouse CI)

### GitHub Actions Workflow

Create `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI
on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://${{ github.repository_owner }}.github.io/vandaemon.online/
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Budget Configuration

Create `lighthouse-budget.json` to enforce performance budgets:

```json
[
  {
    "path": "/*",
    "resourceSizes": [
      {"resourceType": "script", "budget": 50},
      {"resourceType": "stylesheet", "budget": 30},
      {"resourceType": "image", "budget": 300},
      {"resourceType": "total", "budget": 500}
    ],
    "timings": [
      {"metric": "first-contentful-paint", "budget": 1500},
      {"metric": "largest-contentful-paint", "budget": 2500},
      {"metric": "interactive", "budget": 3000}
    ]
  }
]
```

This workflow runs Lighthouse audits on every pull request and enforces performance/accessibility standards.

---

## Troubleshooting

### Site Not Loading After GitHub Pages Deployment

- **Check**: Repository Settings → Pages shows green "Your site is published at..."
- **Wait**: Initial deployment takes 1-2 minutes
- **Cache**: Try hard refresh (Ctrl+Shift+R) or incognito mode
- **Logs**: Check Actions tab for deployment workflow status

### Google Analytics Not Tracking

- **Check**: Measurement ID correct in `js/analytics.js`
- **Check**: Script tag present in `<head>` of all pages
- **Check**: Browser console for GA4 errors
- **Wait**: Real-time reports can have 1-2 minute delay
- **Test**: Use GA4 DebugView for detailed event tracking

### Lighthouse Performance Score Low

- **Images**: Ensure all images optimized (WebP, compressed)
- **CSS**: Inline critical CSS, defer non-critical CSS
- **JavaScript**: Use `async` or `defer` attributes
- **Caching**: Verify browser caching headers (automatic on GitHub Pages)
- **CDN**: GitHub Pages uses Fastly CDN automatically

### Accessibility Violations

- **Run**: aXe DevTools scan to identify specific issues
- **Fix**: Address violations in order: Critical → Serious → Moderate
- **Test**: Re-run aXe after each fix
- **Manual**: Test keyboard navigation and screen reader

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Google Analytics 4 Help](https://support.google.com/analytics/answer/9304153)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## Next Steps

After completing local development and testing:

1. Run `/speckit.tasks` to generate detailed implementation tasks
2. Create pull request with changes
3. Review Lighthouse CI results on PR
4. Merge to main to deploy to GitHub Pages
5. Monitor GA4 analytics for visitor behavior and engagement
