# Tasks: Vandaemon Marketing Website

**Input**: Design documents from `/specs/001-marketing-website/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Tests**: Tests are OPTIONAL - not included as they were not requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Static site**: All files at repository root
- `index.html` - Main homepage
- `css/` - Stylesheets directory
- `js/` - JavaScript directory
- `assets/` - Images and icons
- `.github/workflows/` - GitHub Actions workflows

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, Git setup, and basic directory structure

- [X] T001 Create directory structure: css/, js/, assets/images/, assets/icons/, .github/workflows/
- [X] T002 [P] Create .gitignore file with patterns: .DS_Store, Thumbs.db, *.tmp, *.swp, .vscode/, .idea/, *.log, .env*, node_modules/
- [X] T003 [P] Create placeholder README.md with project title "Vandaemon Marketing Website" and brief description
- [X] T004 Initialize Git repository: git init (if not already a git repo)
- [X] T005 Configure Git user: git config user.name and git config user.email (if not already configured)
- [X] T006 Create initial commit: git add . && git commit -m "Initial commit: project structure"

**Checkpoint**: Directory structure and Git repository ready for content

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core HTML structure and base CSS that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Create index.html with semantic HTML5 structure: <!DOCTYPE html>, <html lang="en">, <head>, <body>, <header>, <main>, <footer>
- [X] T008 Add viewport meta tag and charset to index.html <head>: <meta charset="UTF-8"> and <meta name="viewport" content="width=device-width, initial-scale=1.0">
- [X] T009 [P] Create css/main.css with CSS reset and mobile-first base styles (body, typography, colors, spacing)
- [X] T010 [P] Create css/responsive.css with media query structure for breakpoints: 768px, 1024px, 1440px
- [X] T011 [P] Create css/accessibility.css with focus styles, skip links, and screen reader utilities (.sr-only class)
- [X] T012 Link all CSS files in index.html <head> in correct order: main.css, responsive.css, accessibility.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Project Overview Discovery (Priority: P1) 🎯 MVP

**Goal**: Visitors quickly understand what vandaemon is, what problem it solves, and why they should care

**Independent Test**: Navigate to homepage and verify that within 10 seconds a visitor can articulate what vandaemon does and its primary benefit

### Implementation for User Story 1

- [X] T013 [P] [US1] Create hero section in index.html with semantic structure: <section id="hero" class="hero">, <h1>, <p class="tagline">, <div class="cta-buttons">
- [X] T014 [P] [US1] Add hero section content: compelling headline explaining vandaemon's purpose and concise tagline describing main benefit
- [X] T015 [P] [US1] Style hero section in css/main.css: full-viewport height, centered content, large typography, mobile-first layout
- [X] T016 [P] [US1] Create features section in index.html: <section id="features" class="features">, <h2>, <div class="feature-grid">
- [X] T017 [P] [US1] Add 3-5 feature cards to features section: each with <article class="feature-card">, icon placeholder, <h3> title, <p> description
- [X] T018 [P] [US1] Style features section in css/main.css: mobile-stacked layout, card styling with padding/borders/shadows
- [X] T019 [US1] Add responsive styles for features in css/responsive.css: grid layout for tablet (2 columns) and desktop (3 columns)
- [X] T020 [P] [US1] Add accessibility enhancements in css/accessibility.css: heading hierarchy validation, focus indicators for interactive elements
- [X] T021 [US1] Create navigation header in index.html: <header><nav aria-label="Main navigation">, logo/title, anchor links to sections (#hero, #features, #demo, #github, #getting-started)
- [X] T022 [P] [US1] Style navigation header in css/main.css: mobile-friendly layout, sticky positioning (optional), typography
- [X] T023 [US1] Add responsive navigation in css/responsive.css: horizontal layout for tablet/desktop

**Checkpoint**: At this point, User Story 1 should be fully functional - visitor can understand vandaemon's purpose and key features

---

## Phase 4: User Story 2 - Live Demo Exploration (Priority: P2)

**Goal**: Visitors see vandaemon in action through the hosted demo at https://vandaemon.fly.dev/

**Independent Test**: Visitor can click a clear "Try Demo" link, access the live demo site, and understand what they're experiencing

### Implementation for User Story 2

- [X] T024 [P] [US2] Create demo section in index.html: <section id="demo" class="demo">, <h2>, <div class="demo-content">, <div class="demo-cta">
- [X] T025 [P] [US2] Add demo section content: description of what demo shows, explanation of capabilities, context/prerequisites
- [X] T026 [P] [US2] Add "Try Live Demo" CTA button in demo section: <a href="https://vandaemon.fly.dev/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Try Live Demo</a>
- [X] T027 [P] [US2] Add demo screenshot placeholder in demo section: <img src="assets/images/demo-screenshot.jpg" alt="Vandaemon demo interface" loading="lazy">
- [X] T028 [P] [US2] Style demo section in css/main.css: two-column layout (image + text), button styling, mobile-stacked
- [X] T029 [US2] Add responsive demo layout in css/responsive.css: side-by-side for desktop, stacked for mobile
- [X] T030 [P] [US2] Add button styles and hover states in css/main.css: .btn, .btn-primary with colors, padding, transitions

**Checkpoint**: User Story 2 complete - visitor can access demo site with clear CTA

---

## Phase 5: User Story 3 - Source Code Access (Priority: P3)

**Goal**: Developers access vandaemon source code, documentation, and contribution info via GitHub repository

**Independent Test**: Developer can find and access the GitHub repository at github.com/stuartf303/vandaemon

### Implementation for User Story 3

- [X] T031 [P] [US3] Create GitHub section in index.html: <section id="github" class="github">, <h2>, <div class="github-content">
- [X] T032 [P] [US3] Add GitHub section content: repository description, contribution guidelines summary, community information
- [X] T033 [P] [US3] Add "View on GitHub" CTA button: <a href="https://github.com/stuartf303/vandaemon" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View on GitHub</a>
- [X] T034 [P] [US3] Add GitHub icon/logo to GitHub section using SVG or icon font in assets/icons/
- [X] T035 [P] [US3] Style GitHub section in css/main.css: layout, button secondary variant (.btn-secondary), icon positioning
- [X] T036 [P] [US3] Add documentation links in GitHub section: README, API docs, contribution guide (if applicable)

**Checkpoint**: User Story 3 complete - developer can access GitHub repository and understand how to contribute

---

## Phase 6: User Story 4 - Getting Started Guidance (Priority: P4)

**Goal**: Developers get clear guidance on how to install, configure, and start using vandaemon

**Independent Test**: Developer can find installation instructions and basic setup steps

### Implementation for User Story 4

- [X] T037 [P] [US4] Create getting started section in index.html: <section id="getting-started" class="getting-started">, <h2>, <div class="install-steps">
- [X] T038 [P] [US4] Add installation instructions: step-by-step installation commands in <pre><code> blocks or ordered list
- [X] T039 [P] [US4] Add system requirements and prerequisites: supported platforms, dependencies, version requirements
- [X] T040 [P] [US4] Add "first use" code example: basic usage snippet showing how to start with vandaemon
- [X] T041 [P] [US4] Add link to comprehensive documentation: "Read full documentation" with external link or anchor to docs
- [X] T042 [P] [US4] Style getting started section in css/main.css: code block styling (<pre>, <code>), list styling, layout
- [X] T043 [US4] Add responsive getting started layout in css/responsive.css: multi-column for desktop if beneficial

**Checkpoint**: User Story 4 complete - developer has clear path to getting started with vandaemon

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Analytics, SEO, social sharing, performance optimization, and deployment

### Google Analytics Integration

- [X] T044 [P] Create js/analytics.js file with GA4 initialization: gtag() function, Measurement ID placeholder G-XXXXXXXXXX, anonymize_ip config
- [X] T045 [P] Add GA4 script tag to index.html <head>: <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
- [X] T046 [P] Link analytics.js in index.html before </body>: <script src="js/analytics.js" defer></script>
- [X] T047 Add demo_click event tracking in js/analytics.js: addEventListener on demo CTA button, gtag('event', 'demo_click', {...})
- [X] T048 [P] Add github_click event tracking in js/analytics.js: addEventListener on GitHub CTA button, gtag('event', 'github_click', {...})
- [X] T049 [P] Add docs_click event tracking in js/analytics.js: addEventListener on documentation links, gtag('event', 'docs_click', {...})
- [X] T050 [P] Add analytics disclosure to footer in index.html: "This site uses Google Analytics to understand visitor behavior"

### SEO & Social Media Meta Tags

- [X] T051 [P] Add <title> tag to index.html <head>: "Vandaemon - [Tagline describing project]"
- [X] T052 [P] Add meta description to index.html <head>: <meta name="description" content="[150-160 character description of vandaemon]">
- [X] T053 [P] Add Open Graph meta tags to index.html <head>: og:type, og:url, og:title, og:description, og:image (1200x630px)
- [X] T054 [P] Add Twitter Card meta tags to index.html <head>: twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image
- [X] T055 [P] Create OG image in assets/images/: og-image.jpg (1200x630px) with vandaemon logo and tagline
- [X] T056 [P] Add favicon to index.html <head>: <link rel="icon" type="image/png" href="assets/icons/favicon.png">

### Accessibility & Cross-Browser

- [X] T057 [P] Add skip link to index.html after <body>: <a href="#main" class="skip-link">Skip to main content</a>
- [X] T058 [P] Verify all images have descriptive alt text in index.html: check <img> tags have alt="..." with meaningful descriptions
- [X] T059 [P] Verify heading hierarchy in index.html: one <h1>, then <h2> for sections, <h3> for subsections (no skipping)
- [X] T060 [P] Add ARIA labels where needed in index.html: aria-label on buttons without text, aria-labelledby on sections
- [X] T061 [P] Style skip link in css/accessibility.css: positioned off-screen, visible on :focus with z-index and transitions
- [X] T062 [P] Add focus indicators in css/accessibility.css: :focus and :focus-visible styles with clear outlines on interactive elements

### Footer & Legal

- [X] T063 [P] Create footer section in index.html: <footer>, copyright notice, social links (GitHub, Twitter, etc.), privacy policy link (optional)
- [X] T064 [P] Style footer in css/main.css: background color, padding, centered text, link colors
- [X] T065 [P] Add responsive footer layout in css/responsive.css: multi-column for desktop if multiple link groups

### Performance Optimization

- [X] T066 [P] Add loading="lazy" attribute to all below-the-fold images in index.html
- [X] T067 [P] Optimize images in assets/images/: compress JPG/PNG files, create WebP versions (if applicable), ensure <200KB per image
- [X] T068 [P] Add <picture> elements for WebP with fallbacks in index.html (if WebP images created): <source srcset="image.webp">, <img src="image.jpg">
- [X] T069 [P] Minify CSS files: css/main.css, css/responsive.css, css/accessibility.css (remove whitespace, comments - optional for initial version)
- [X] T070 [P] Verify total page weight <500KB: use browser DevTools Network tab to measure total download size

### GitHub Repository & Deployment

- [X] T071 Create GitHub repository: go to github.com, create new repository named "vandaemon.online" (public, no README/gitignore/license)
- [X] T072 Add GitHub remote to local repository: git remote add origin https://github.com/stuartf303/vandaemon.online.git
- [X] T073 [P] Create .github/workflows/lighthouse.yml for Lighthouse CI: GitHub Actions workflow with treosh/lighthouse-ci-action@v9
- [X] T074 [P] Create lighthouse-budget.json with performance budgets: resourceSizes (script: 50KB, stylesheet: 30KB, image: 300KB, total: 500KB), timings (FCP: 1500ms, LCP: 2500ms)
- [X] T075 Commit all files to Git: git add ., git commit -m "Add vandaemon marketing website"
- [X] T076 Push to GitHub main branch: git push -u origin main (first push with upstream tracking)
- [X] T077 Enable GitHub Pages in repository settings: Settings → Pages → Source: main branch, / (root) → Save
- [X] T078 Verify deployment: visit https://stuartf303.github.io/vandaemon.online/ and confirm site loads correctly
- [X] T079 [P] Test all external links: verify demo link (https://vandaemon.fly.dev/) and GitHub link (https://github.com/stuartf303/vandaemon) work

### Final Validation

- [X] T080 Run Lighthouse audit locally: Chrome DevTools → Lighthouse → Performance, Accessibility, SEO → Generate report
- [X] T081 Verify Lighthouse scores: Performance 90+, Accessibility 90+, SEO 90+, Best Practices 90+ (address any critical issues)
- [X] T082 [P] Test mobile responsiveness: Chrome DevTools Device Toolbar → test iPhone SE (375px), iPad (768px), Desktop (1024px+)
- [X] T083 [P] Test keyboard navigation: Tab through all interactive elements, verify visible focus indicators, test skip link
- [X] T084 [P] Test screen reader: NVDA (Windows) or VoiceOver (macOS) → verify heading structure, alt text, ARIA labels read correctly
- [X] T085 [P] Cross-browser testing: open site in Chrome, Firefox, Safari, Edge → verify layout and functionality
- [X] T086 Verify Google Analytics tracking: open site, open GA4 Real-time reports, click demo/GitHub links, verify events appear
- [X] T087 [P] Test social sharing previews: use Facebook Sharing Debugger and Twitter Card Validator to verify meta tags render correctly

---

## Dependencies

### User Story Independence

All user stories (US1, US2, US3, US4) are **independent** and can be implemented in parallel after Phase 2 (Foundational) is complete.

**Dependency Graph**:
```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ↓
    ├──→ Phase 3 (US1 - Overview) [MVP] ← Start here for quickest value
    ├──→ Phase 4 (US2 - Demo)
    ├──→ Phase 5 (US3 - GitHub)
    └──→ Phase 6 (US4 - Getting Started)
         ↓
Phase 7 (Polish) ← Can start in parallel with US implementation
```

### Parallel Execution Opportunities

**After Phase 2 completes**, these user story phases can run in parallel:
- Phase 3 (US1) + Phase 4 (US2) + Phase 5 (US3) + Phase 6 (US4)

**Within Phase 7**, most tasks marked [P] can run in parallel:
- T044-T050 (Analytics) can run parallel with T051-T056 (SEO/Social)
- T057-T062 (Accessibility) can run parallel with T063-T065 (Footer)
- T066-T070 (Performance) can run after content tasks complete

### Critical Path (Minimum for MVP)

**MVP = Phase 1 + Phase 2 + Phase 3 (US1) + Phase 7 (partial)**

Minimum viable product includes:
1. Setup with Git (T001-T006)
2. Foundational HTML/CSS (T007-T012)
3. User Story 1 - Overview (T013-T023): Hero + Features
4. Essential Polish:
   - SEO meta tags (T051-T052)
   - Basic accessibility (T057-T062)
   - GitHub repo & deployment (T071-T072, T075-T078)

Total MVP tasks: ~40 tasks
Estimated time: 5-7 hours for experienced developer

### Full Implementation

**Full = All Phases (MVP + US2 + US3 + US4 + Full Polish)**

Total all tasks: 87 tasks
Estimated time: 14-18 hours for experienced developer

---

## Implementation Strategy

### Recommended Order

1. **Phase 1-2**: Setup and Foundation (blocking)
2. **Phase 3**: User Story 1 - Overview (highest priority, MVP)
3. **Phase 4-6**: User Stories 2-4 in any order (parallel)
4. **Phase 7**: Polish and deployment (can overlap with US4-6)

### Testing Checkpoints

After each user story phase completes:
- Open index.html in browser
- Verify section renders correctly on mobile (375px) and desktop (1024px+)
- Test links and interactions work
- Verify semantic HTML structure with DevTools

After Phase 7 (Polish) completes:
- Run full Lighthouse audit
- Test all browsers and devices
- Verify analytics tracking
- Confirm GitHub Pages deployment

---

## Notes

- **No backend or database**: This is a static HTML/CSS/JS site
- **No build process**: Vanilla files, no webpack/bundlers needed initially
- **Progressive enhancement**: Site must work without JavaScript (analytics and optional interactions only)
- **Mobile-first**: Base CSS targets mobile, media queries enhance for larger screens
- **Accessibility**: WCAG 2.1 AA compliance required throughout

---

## Quick Reference

**Total Tasks**: 87
**Tasks per Phase**:
- Phase 1 (Setup + Git): 6 tasks
- Phase 2 (Foundational): 6 tasks
- Phase 3 (US1 - Overview): 11 tasks
- Phase 4 (US2 - Demo): 7 tasks
- Phase 5 (US3 - GitHub): 6 tasks
- Phase 6 (US4 - Getting Started): 7 tasks
- Phase 7 (Polish + Deployment): 44 tasks

**Parallelizable Tasks**: 58 tasks marked with [P]
**Sequential Tasks**: 29 tasks (must run in order)

**MVP Tasks**: 40 tasks (Phases 1-3 + essential polish + Git/deployment)
**Full Implementation**: 87 tasks (all phases)

**GitHub Repository**: https://github.com/stuartf303/vandaemon.online (to be created in T071)
**Deployed Site**: https://stuartf303.github.io/vandaemon.online/ (after T078)
