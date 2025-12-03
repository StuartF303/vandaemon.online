# Implementation Plan: Vandaemon Marketing Website

**Branch**: `001-marketing-website` | **Date**: 2025-12-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-marketing-website/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a marketing website for the vandaemon project that clearly communicates its value proposition, provides access to a live demo, and guides developers to the GitHub repository and documentation. The site will be deployed via GitHub Pages, optimized for mobile devices, and instrumented with Google Analytics for visitor tracking.

**Key Technical Decisions**:
- Static site hosted on GitHub Pages (free, reliable, automatic deployment)
- Mobile-first responsive design (CSS Grid/Flexbox)
- Google Analytics 4 for visitor tracking and engagement metrics
- Semantic HTML with meta tags for SEO and social sharing

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES6+)
**Primary Dependencies**: None (vanilla HTML/CSS/JS for maximum performance and simplicity)
**Storage**: N/A (static informational site, no backend or database)
**Testing**: Lighthouse CI for performance/accessibility/SEO, manual cross-browser testing
**Target Platform**: GitHub Pages (static site hosting), all modern browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Static website (single-page or multi-page)
**Deployment**: GitHub Pages with custom domain support
**Analytics**: Google Analytics 4 (GA4) with event tracking
**Performance Goals**:
  - Lighthouse Performance score 90+
  - First Contentful Paint < 1.5s
  - Largest Contentful Paint < 2.5s
  - Total page weight < 500KB
**Constraints**:
  - Must work without JavaScript (progressive enhancement)
  - Mobile-first responsive design (320px to 2560px viewports)
  - WCAG 2.1 AA accessibility compliance
  - GitHub Pages limitations (static files only, no server-side processing)
**Scale/Scope**:
  - Single marketing site (3-5 pages/sections)
  - Expected traffic: <10,000 visitors/month initially
  - Content updates via git commits

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS - Constitution template contains only placeholders. No concrete principles defined yet for this project. Static marketing website has no constitution violations as it involves no complex architecture, microservices, or testing requirements that would trigger governance rules.

**Rationale**: This is a simple static website with no backend services, no data persistence, and no complex architecture. When the project constitution is populated with actual principles, this check should be re-evaluated.

## Project Structure

### Documentation (this feature)

```text
specs/001-marketing-website/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── checklists/          # Quality validation checklists
│   └── requirements.md  # Specification quality checklist
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
/
├── index.html           # Homepage with hero, features, demo/GitHub CTAs
├── css/
│   ├── main.css        # Core styles (mobile-first)
│   ├── responsive.css  # Media queries for tablet/desktop
│   └── accessibility.css # A11y enhancements (focus states, screen reader)
├── js/
│   ├── analytics.js    # Google Analytics 4 initialization and event tracking
│   └── navigation.js   # Mobile menu toggle, smooth scrolling (optional)
├── assets/
│   ├── images/         # Logos, screenshots, hero images
│   └── icons/          # SVG icons for features, social media
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow for automated deployment
└── docs/                # GitHub Pages content (if using /docs folder deployment)
    └── CNAME           # Custom domain configuration (optional)
```

**Structure Decision**: Single-page static website with GitHub Pages deployment. All content in repository root for simplicity. CSS and JS organized into separate directories for maintainability. GitHub Actions workflow ensures automatic deployment on push to main branch.

## Complexity Tracking

> **Not applicable** - No constitution violations. Static website architecture is straightforward with no complexity requiring justification.

## Phase 0: Research & Decisions

### Research Tasks

1. **GitHub Pages Deployment Options**
   - **Decision**: Use repository root (`/`) or `/docs` folder for GitHub Pages
   - **Research**: Compare root vs. /docs deployment, custom domain setup, build process options

2. **Google Analytics 4 Integration**
   - **Decision**: GA4 measurement ID configuration and event tracking strategy
   - **Research**: GA4 setup for static sites, privacy considerations (GDPR/CCPA), cookie consent requirements

3. **Mobile-First Responsive Design Strategy**
   - **Decision**: Breakpoints, CSS framework vs. vanilla CSS
   - **Research**: Modern CSS Grid/Flexbox patterns, common mobile breakpoints (320px, 768px, 1024px, 1440px)

4. **Performance Optimization Techniques**
   - **Decision**: Image formats (WebP with fallbacks), lazy loading, critical CSS
   - **Research**: Lighthouse CI integration, image optimization tools, CSS/JS minification

5. **Accessibility Best Practices**
   - **Decision**: Semantic HTML structure, ARIA labels, keyboard navigation
   - **Research**: WCAG 2.1 AA requirements, screen reader testing tools (NVDA, VoiceOver)

6. **Social Media Meta Tags**
   - **Decision**: Open Graph and Twitter Card implementations
   - **Research**: Required meta tags for LinkedIn, Twitter, Facebook sharing previews

**Output**: `research.md` with detailed findings and rationale for each decision

## Phase 1: Design & Contracts

### Content Structure (data-model.md)

**Page Sections**:
- **Hero Section**: Headline, tagline, primary CTA (Try Demo)
- **Features Section**: 3-5 feature cards with icons, titles, descriptions
- **Demo Section**: Description, screenshot/video, CTA to https://vandaemon.fly.dev/
- **Getting Started Section**: Quick installation steps, code examples
- **GitHub Section**: Repository link, contribution guidelines, community info
- **Footer**: Social links, documentation links, license info

**No traditional data model needed** - Static content only, no entities or relationships.

### Contracts (N/A for static site)

**No API contracts needed** - This is a static informational site with no backend APIs or data services.

### Analytics Events

**Google Analytics 4 Events to Track**:
- `page_view` (automatic)
- `demo_click` - When user clicks "Try Live Demo" button
- `github_click` - When user clicks "View on GitHub" button
- `docs_click` - When user clicks documentation links
- `getting_started_view` - When getting started section scrolls into view
- `social_share` - When user clicks social media share buttons (if implemented)

**Event Parameters**:
- `link_url` - Destination URL for external links
- `section` - Which section of the page triggered the event
- `device_category` - Mobile, tablet, or desktop (automatic)

### Quickstart Guide (quickstart.md)

**Developer Setup**:
1. Clone repository
2. Open `index.html` in browser for local development
3. Make content/style changes
4. Test responsiveness using browser DevTools
5. Commit and push to trigger GitHub Pages deployment

**Testing Checklist**:
- Lighthouse audit (Performance, Accessibility, SEO scores 90+)
- Mobile responsiveness (Chrome DevTools device toolbar)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Screen reader testing (NVDA on Windows, VoiceOver on macOS)
- External link verification (demo site, GitHub repo)
- Google Analytics event verification (Real-time view in GA4)

**Output**: `quickstart.md` with setup instructions and testing checklist

## Implementation Notes

### GitHub Pages Configuration

**Deployment Options**:
1. **Root deployment** (`/` branch setting): Entire repo root published
2. **Docs folder** (`/docs` branch setting): Only `/docs` folder published
3. **gh-pages branch**: Separate branch for built artifacts

**Recommended**: Root deployment for simplicity (single branch workflow)

**Custom Domain** (optional):
- Add `CNAME` file with custom domain
- Configure DNS with GitHub Pages IP addresses
- Enable HTTPS in repository settings

### Google Analytics Setup

**Configuration Steps**:
1. Create GA4 property at analytics.google.com
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add GA4 script tag to `<head>` of all HTML pages
4. Configure custom events in `js/analytics.js`
5. Test with GA4 Real-time reports

**Privacy Considerations**:
- Include analytics disclosure in privacy policy or footer
- Consider cookie consent banner if targeting EU visitors
- Configure IP anonymization in GA4 settings

### Responsive Design Strategy

**Breakpoints**:
- **Mobile**: 320px - 767px (base styles, mobile-first)
- **Tablet**: 768px - 1023px (medium viewport adjustments)
- **Desktop**: 1024px - 1439px (large viewport, multi-column layouts)
- **Wide**: 1440px+ (extra-large viewport, max-width container)

**Mobile-First Approach**:
- Base CSS targets mobile devices
- Media queries progressively enhance for larger screens
- Touch-friendly tap targets (44x44px minimum)
- Hamburger menu for mobile navigation (if multi-page)

### Performance Optimization

**Techniques**:
- **Image Optimization**: WebP format with JPEG/PNG fallbacks, responsive images with `srcset`
- **CSS Optimization**: Critical CSS inlined, non-critical CSS loaded asynchronously
- **JavaScript**: Minimal JS, defer/async loading for analytics
- **HTTP/2**: Enabled by default on GitHub Pages
- **Caching**: Leverage browser caching with proper cache headers

**Lighthouse CI Integration**:
- GitHub Actions workflow to run Lighthouse audits on PRs
- Enforce minimum scores (Performance: 90, Accessibility: 90, SEO: 90)
- Fail PR if scores drop below thresholds

## Post-Implementation Checklist

- [ ] All pages load in under 3 seconds on 3G connection
- [ ] Lighthouse scores: Performance 90+, Accessibility 90+, SEO 90+
- [ ] Mobile responsive on iOS Safari, Android Chrome
- [ ] Desktop tested on Chrome, Firefox, Safari, Edge
- [ ] Screen reader navigation works (NVDA, VoiceOver)
- [ ] All external links verified (demo, GitHub, docs)
- [ ] Google Analytics events tracking correctly
- [ ] Meta tags present for social media sharing
- [ ] WCAG 2.1 AA compliance verified with automated tools
- [ ] GitHub Pages deployment successful
- [ ] Custom domain configured (if applicable)
