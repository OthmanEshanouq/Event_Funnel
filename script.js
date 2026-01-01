/* ============================================
   Valley's Adventure - Main JavaScript
   ============================================ */

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initHamburgerMenu();
    initSmoothScroll();
    initHeroAnimations();
    initVideoFallback();
});

/* ============================================
   Theme Toggle (Day/Night Mode)
   ============================================ */

/**
 * Initialize theme toggle functionality
 * - Loads saved theme from localStorage
 * - Handles theme toggle button clicks
 * - Updates CSS variables for light/dark mode
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Load saved theme from localStorage or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme attribute
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Add smooth transition class for theme change
        htmlElement.classList.add('theme-transitioning');
        setTimeout(() => {
            htmlElement.classList.remove('theme-transitioning');
        }, 300);
    });
}

/* ============================================
   Hamburger Menu (Mobile Navigation)
   ============================================ */

/**
 * Initialize hamburger menu functionality
 * - Toggles mobile navigation menu
 * - Handles menu open/close states
 * - Closes menu when clicking outside or on nav links
 */
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    const navLinks = navMobile.querySelectorAll('.nav-link');
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMobile.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMobile.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMobile.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize (if switching to desktop view)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   Smooth Scroll
   ============================================ */

/**
 * Initialize smooth scroll behavior for anchor links
 * - Handles smooth scrolling to sections
 * - Accounts for fixed header height
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   Hero Section Animations
   ============================================ */

/**
 * Initialize hero section animations
 * - Triggers entrance animations for hero text
 * - Uses Intersection Observer for performance
 */
function initHeroAnimations() {
    const heroLines = document.querySelectorAll('.hero-line');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip animations if user prefers reduced motion
        heroLines.forEach(line => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        });
        return;
    }
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each hero line
    heroLines.forEach(line => {
        observer.observe(line);
    });
}

/* ============================================
   Video Fallback Handling
   ============================================ */

/**
 * Initialize video fallback and error handling
 * - Handles video loading errors gracefully
 * - Provides fallback background if video fails to load
 */
function initVideoFallback() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (!heroVideo) return;
    
    // Handle video load error
    heroVideo.addEventListener('error', function() {
        console.warn('Hero video failed to load, using fallback background');
        
        // Add fallback background image or gradient
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            heroVideo.style.display = 'none';
        }
    });
    
    // Ensure video plays (some browsers require user interaction)
    heroVideo.addEventListener('loadeddata', function() {
        // Set video playback rate to 0.25 (quarter speed - 400% slower)
        heroVideo.playbackRate = 0.25;
        heroVideo.play().catch(error => {
            console.warn('Video autoplay prevented:', error);
        });
    });
    
    // Also set playback rate when video can play
    heroVideo.addEventListener('canplay', function() {
        heroVideo.playbackRate = 0.25;
    });
    
    // Handle video loading
    heroVideo.load();
}

/* ============================================
   Header Scroll Effect (Optional Enhancement)
   ============================================ */

/**
 * Optional: Add scroll effect to header
 * - Changes header appearance on scroll
 * - Can be enabled if desired
 */
function initHeaderScrollEffect() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// Initialize header scroll effect
initHeaderScrollEffect();

/* ============================================
   Utility Functions
   ============================================ */

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   Error Handling
   ============================================ */

// Global error handler for better debugging
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

