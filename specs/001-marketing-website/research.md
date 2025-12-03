# Research & Technical Decisions: Vandaemon Marketing Website

**Feature**: 001-marketing-website
**Date**: 2025-12-03
**Status**: Complete

## Overview

This document captures research findings and technical decisions for building the vandaemon marketing website. All decisions prioritize simplicity, performance, and ease of maintenance while meeting the requirements for GitHub Pages deployment, mobile responsiveness, and Google Analytics integration.

---

## 1. GitHub Pages Deployment Options

### Decision: Use Repository Root (`/`) Deployment

**Rationale**:
- Simplest workflow: single branch, no separate build artifacts
- Direct editing of HTML/CSS/JS in main branch
- Automatic deployment on push to main
- No need for separate `/docs` folder or `gh-pages` branch
- Easier for contributors to understand project structure

**Alternatives Considered**:

1. **`/docs` Folder Deployment**
   - **Pros**: Keeps source code separate from site content, cleaner repository root
   - **Cons**: Additional folder layer, confusing for simple static sites
   - **Rejected**: Unnecessary complexity for a single-page marketing site

2. **`gh-pages` Branch**
   - **Pros**: Complete separation of source and deployment, supports build processes
   - **Cons**: Requires separate branch management, GitHub Actions workflow for deployment
   - **Rejected**: Overkill for vanilla HTML/CSS/JS site with no build step

**Implementation Details**:
- Repository Settings → Pages → Source: Deploy from branch `main` → `/ (root)`
- Automatic deployment via GitHub Actions (enabled by default for Pages)
- Custom domain support via `CNAME` file in repository root
- HTTPS automatically enabled by GitHub Pages

**References**:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

---

## 2. Google Analytics 4 Integration

### Decision: GA4 with Event Tracking, No Cookie Consent Banner (Initially)

**Rationale**:
- GA4 is the current standard (Universal Analytics deprecated July 2023)
- Event-driven data model provides better insights than pageview-only tracking
- Custom events track key user interactions (demo clicks, GitHub clicks)
- Privacy considerations addressed with IP anonymization
- Cookie consent banner deferred until traffic/audience warrants it

**Implementation Strategy**:

**GA4 Setup**:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

**Custom Events**:
```javascript
// Track demo link clicks
document.querySelector('.demo-link').addEventListener('click', function() {
  gtag('event', 'demo_click', {
    'link_url': 'https://vandaemon.fly.dev/',
    'section': 'hero'
  });
});

// Track GitHub link clicks
document.querySelector('.github-link').addEventListener('click', function() {
  gtag('event', 'github_click', {
    'link_url': 'https://github.com/stuartf303/vandaemon',
    'section': 'navigation'
  });
});
```

**Privacy Considerations**:
- IP anonymization enabled (`anonymize_ip: true`)
- Analytics disclosure in footer: "This site uses Google Analytics to understand visitor behavior"
- No personally identifiable information (PII) collected
- Cookie consent banner: Defer until GDPR compliance needed (if targeting EU audience significantly)

**Alternatives Considered**:

1. **Google Tag Manager (GTM)**
   - **Pros**: More flexible, no code changes for event tracking
   - **Cons**: Additional complexity, larger initial page load
   - **Rejected**: GA4 direct integration sufficient for simple event tracking

2. **Privacy-Focused Analytics (Plausible, Fathom, Simple Analytics)**
   - **Pros**: No cookies, GDPR-compliant by default, lightweight
   - **Cons**: Paid services ($9-19/month), less feature-rich than GA4
   - **Rejected**: GA4 free tier adequate for initial launch, can migrate later if needed

3. **No Analytics**
   - **Pros**: No privacy concerns, fastest page load
   - **Cons**: No visibility into visitor behavior, traffic sources, or engagement
   - **Rejected**: User requirements explicitly requested Google Analytics

**References**:
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Event Tracking in GA4](https://support.google.com/analytics/answer/9267735)
- [GDPR Compliance for GA4](https://support.google.com/analytics/answer/9019185)

---

## 3. Mobile-First Responsive Design Strategy

### Decision: Vanilla CSS with Mobile-First Media Queries (No Framework)

**Rationale**:
- Maximum performance: zero framework overhead, no unused CSS
- Full control over every style and breakpoint
- Easier to achieve Lighthouse Performance score 90+
- Modern CSS (Grid, Flexbox) eliminates need for framework utilities
- Simple site doesn't benefit from framework component libraries

**Breakpoints**:
```css
/* Mobile-first base styles (320px - 767px) */
.container { padding: 1rem; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container { padding: 2rem; max-width: 750px; margin: 0 auto; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container { max-width: 960px; }
  .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
}

/* Wide (1440px+) */
@media (min-width: 1440px) {
  .container { max-width: 1200px; }
}
```

**Mobile-First Principles**:
1. Base styles target smallest screens (320px)
2. Progressive enhancement via min-width media queries
3. Touch targets: 44x44px minimum (WCAG 2.1 AA)
4. Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
5. Flexible images: `img { max-width: 100%; height: auto; }`

**Alternatives Considered**:

1. **Tailwind CSS**
   - **Pros**: Utility-first, fast development, purge unused CSS
   - **Cons**: Build step required, learning curve, overkill for simple site
   - **Rejected**: Adds complexity without clear benefit for 3-5 page sections

2. **Bootstrap**
   - **Pros**: Comprehensive component library, responsive grid
   - **Cons**: ~250KB CSS (even minified), prescriptive design, framework overhead
   - **Rejected**: Too heavy for performance goals, unnecessary components

3. **CSS Frameworks (Bulma, Foundation, Semantic UI)**
   - **Pros**: Pre-built components, rapid prototyping
   - **Cons**: All add weight and unused CSS
   - **Rejected**: Vanilla CSS sufficient for simple marketing site

**Testing Strategy**:
- Chrome DevTools Device Toolbar (simulate mobile/tablet)
- Real device testing: iPhone (Safari), Android (Chrome)
- Responsive breakpoint tests: 320px, 375px, 768px, 1024px, 1440px

**References**:
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Mobile-First CSS](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)
- [WCAG Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

---

## 4. Performance Optimization Techniques

### Decision: Manual Optimization + Lighthouse CI

**Rationale**:
- Manual optimization sufficient for static site (no build tooling needed)
- Lighthouse CI enforces performance standards on every PR
- WebP images with fallbacks for older browsers
- Critical CSS inlined in `<head>` for faster First Contentful Paint
- Minimal JavaScript deferred to avoid blocking rendering

**Optimization Checklist**:

**Images**:
- Convert to WebP format (60-80% smaller than JPEG/PNG)
- Provide JPEG/PNG fallbacks using `<picture>` element
- Use responsive images with `srcset` for different screen sizes
- Lazy load below-the-fold images: `<img loading="lazy">`
- Compress with tools: Squoosh, ImageOptim, TinyPNG

```html
<picture>
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Vandaemon hero image" loading="lazy">
</picture>
```

**CSS**:
- Inline critical CSS (above-the-fold styles) in `<head>`
- Load non-critical CSS asynchronously:
```html
<link rel="preload" href="css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/main.css"></noscript>
```
- Minify CSS (manual or automated): Remove whitespace, comments

**JavaScript**:
- Minimal JS usage (analytics, optional smooth scrolling)
- Defer analytics script: `<script async src="...">`
- No jQuery or large libraries
- Total JS budget: <50KB

**Lighthouse CI**:
- GitHub Actions workflow runs on every PR
- Enforce thresholds: Performance 90+, Accessibility 90+, SEO 90+
- Block merge if scores drop below thresholds

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://username.github.io/vandaemon.online/
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

**Alternatives Considered**:

1. **Build Tooling (Webpack, Parcel, Vite)**
   - **Pros**: Automatic minification, tree-shaking, code splitting
   - **Cons**: Build complexity, dependencies, configuration
   - **Rejected**: Static site doesn't benefit from build process

2. **CDN for Static Assets**
   - **Pros**: Faster global delivery, edge caching
   - **Cons**: GitHub Pages already uses CDN (Fastly), no additional benefit
   - **Rejected**: GitHub Pages CDN sufficient

3. **Service Worker / Offline Support**
   - **Pros**: Offline functionality, faster repeat visits
   - **Cons**: Complexity, cache invalidation challenges
   - **Rejected**: Overkill for marketing site that requires online demo access

**Performance Targets**:
- **Lighthouse Performance**: 90+
- **First Contentful Paint (FCP)**: <1.5s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1
- **Total Page Weight**: <500KB (HTML + CSS + JS + images)

**References**:
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [WebP Image Format](https://developers.google.com/speed/webp)

---

## 5. Accessibility Best Practices

### Decision: WCAG 2.1 AA Compliance with Semantic HTML

**Rationale**:
- WCAG 2.1 AA is industry standard and legal requirement (ADA, Section 508)
- Semantic HTML provides built-in accessibility (no ARIA needed in most cases)
- Screen reader testing ensures real-world usability
- Automated tools catch 30-40% of issues; manual testing required

**Accessibility Checklist**:

**Semantic HTML**:
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` (not `<div>`)
- Heading hierarchy: `<h1>` (once), then `<h2>`, `<h3>` (no skipping)
- `<button>` for interactive elements (not `<div onclick>`)
- `<a href>` for links (not `<span onclick>`)

**Keyboard Navigation**:
- All interactive elements focusable: Tab order logical
- Visible focus indicators: `:focus` styles (outline or custom)
- Skip link to main content: `<a href="#main" class="skip-link">Skip to main content</a>`

**Screen Reader Support**:
- Alt text for all images: Descriptive (not "image" or filename)
- ARIA labels when needed: `<button aria-label="Open navigation menu">`
- Live regions for dynamic content: `<div aria-live="polite">`

**Color & Contrast**:
- WCAG AA contrast ratios:
  - Normal text: 4.5:1 minimum
  - Large text (18pt+): 3:1 minimum
  - UI components: 3:1 minimum
- Don't rely on color alone: Use icons, text labels

**Testing Tools**:
- **Automated**: aXe DevTools, Lighthouse, WAVE
- **Manual**: NVDA (Windows), VoiceOver (macOS), JAWS (Windows)
- **Keyboard-only navigation**: Disconnect mouse, test Tab/Enter/Space

**Example Accessible Navigation**:
```html
<nav aria-label="Main navigation">
  <button aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-menu">
    <span class="sr-only">Menu</span>
    <svg aria-hidden="true"><!-- hamburger icon --></svg>
  </button>
  <ul id="nav-menu" hidden>
    <li><a href="#features">Features</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#github">GitHub</a></li>
  </ul>
</nav>
```

**Alternatives Considered**:

1. **ARIA-Heavy Approach**
   - **Pros**: More control over screen reader behavior
   - **Cons**: Error-prone, semantic HTML often better
   - **Rejected**: Use ARIA sparingly ("First Rule of ARIA: Don't use ARIA")

2. **Accessibility Overlay (AccessiBe, UserWay)**
   - **Pros**: Quick "fix" for accessibility
   - **Cons**: Often ineffective, criticized by disability community, subscription cost
   - **Rejected**: Build accessibility in from the start, not as overlay

**References**:
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

## 6. Social Media Meta Tags

### Decision: Open Graph + Twitter Cards for All Major Platforms

**Rationale**:
- Open Graph (OG) tags used by Facebook, LinkedIn, WhatsApp, others
- Twitter Cards provide rich previews on Twitter/X
- Essential for marketing site (shareability increases reach)
- Static meta tags sufficient (no dynamic content)

**Required Meta Tags**:

```html
<!-- Primary Meta Tags -->
<title>Vandaemon - [Tagline]</title>
<meta name="title" content="Vandaemon - [Tagline]">
<meta name="description" content="[Concise description of vandaemon, 150-160 characters]">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://vandaemon.github.io/">
<meta property="og:title" content="Vandaemon - [Tagline]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:image" content="https://vandaemon.github.io/assets/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://vandaemon.github.io/">
<meta property="twitter:title" content="Vandaemon - [Tagline]">
<meta property="twitter:description" content="[Same as meta description]">
<meta property="twitter:image" content="https://vandaemon.github.io/assets/images/twitter-card.jpg">
```

**OG Image Requirements**:
- Dimensions: 1200x630px (Facebook/LinkedIn recommended)
- Format: JPG or PNG
- Size: <1MB
- Content: Logo + tagline + visually appealing design

**Twitter Card Image**:
- Dimensions: 1200x628px (summary_large_image)
- Format: JPG, PNG, WebP
- Size: <5MB

**Testing**:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**Alternatives Considered**:

1. **Dynamic OG Tags (per page)**
   - **Pros**: Custom sharing previews for different pages
   - **Cons**: Single-page site doesn't need it
   - **Rejected**: Static tags sufficient for homepage-focused site

2. **Minimal Meta Tags (title/description only)**
   - **Pros**: Simpler, less maintenance
   - **Cons**: Poor social media sharing experience (no images, plain text)
   - **Rejected**: Social sharing is critical for marketing site discoverability

**References**:
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Meta Tags Guide](https://metatags.io/)

---

## Summary of Decisions

| Area | Decision | Key Benefit |
|------|----------|-------------|
| Deployment | GitHub Pages (root) | Simplest workflow, automatic deployment |
| Analytics | Google Analytics 4 + Custom Events | User behavior insights, engagement tracking |
| Responsive Design | Vanilla CSS, Mobile-First | Maximum performance, no framework overhead |
| Performance | Manual optimization + Lighthouse CI | 90+ Lighthouse scores, <3s load time |
| Accessibility | WCAG 2.1 AA, Semantic HTML | Legal compliance, inclusive experience |
| Social Sharing | Open Graph + Twitter Cards | Rich previews, increased shareability |

**Implementation Priority**:
1. Core HTML structure (semantic, accessible)
2. Mobile-first CSS (responsive, performant)
3. Google Analytics integration (tracking, events)
4. Social meta tags (sharing, discovery)
5. Performance optimizations (images, Lighthouse CI)
6. Cross-browser testing (Chrome, Firefox, Safari, Edge)

**Next Phase**: Proceed to `/speckit.tasks` to generate actionable implementation tasks based on these research findings.
