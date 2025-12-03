/**
 * Google Analytics 4 Integration
 * Tracks page views and custom events
 */

// Initialize Google Analytics 4
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-E09FC5Y8J4', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
});

/**
 * Track custom events for user interactions
 */

// Track CTA button clicks
document.addEventListener('DOMContentLoaded', function() {
    // Track "Try Live Demo" button clicks
    const demoButtons = document.querySelectorAll('a[href*="vandaemon.fly.dev"], a[href="#demo"]');
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            gtag('event', 'demo_click', {
                'event_category': 'engagement',
                'event_label': this.textContent.trim(),
                'value': 1
            });
        });
    });

    // Track "View on GitHub" button clicks
    const githubButtons = document.querySelectorAll('a[href*="github.com/stuartf303/vandaemon"]');
    githubButtons.forEach(button => {
        button.addEventListener('click', function() {
            gtag('event', 'github_click', {
                'event_category': 'engagement',
                'event_label': this.textContent.trim(),
                'value': 1
            });
        });
    });

    // Track navigation link clicks
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'navigation_click', {
                'event_category': 'navigation',
                'event_label': this.getAttribute('href'),
                'value': 1
            });
        });
    });

    // Track scroll depth
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);

        if (currentScroll > scrollDepth) {
            scrollDepth = currentScroll;

            // Track at 25%, 50%, 75%, 100% scroll depth
            if (scrollDepth >= 25 && scrollDepth < 50 && !window.tracked25) {
                window.tracked25 = true;
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': '25%',
                    'value': 25
                });
            } else if (scrollDepth >= 50 && scrollDepth < 75 && !window.tracked50) {
                window.tracked50 = true;
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': '50%',
                    'value': 50
                });
            } else if (scrollDepth >= 75 && scrollDepth < 100 && !window.tracked75) {
                window.tracked75 = true;
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': '75%',
                    'value': 75
                });
            } else if (scrollDepth >= 100 && !window.tracked100) {
                window.tracked100 = true;
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': '100%',
                    'value': 100
                });
            }
        }
    });

    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function() {
                gtag('event', 'outbound_link', {
                    'event_category': 'outbound',
                    'event_label': this.href,
                    'value': 1
                });
            });
        }
    });
});
