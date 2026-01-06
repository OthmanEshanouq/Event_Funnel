/**
 * Cycling Every Where - Main JavaScript
 * Handles theme toggle, language switcher, and hero image slider
 */

// Wait for DOM to be fully loaded before executing
(function init() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAll);
    } else {
        // DOM is already loaded
        initializeAll();
    }
    
    function initializeAll() {
        initThemeToggle();
        initLanguageSwitcher();
        initHeroSlider();
        initSmoothScrolling();
        initIcons();
        initHeaderScrollEffect();
        initLazyLoading();
    }
})();

// ============================================
// Theme Toggle Functionality
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    if (!html) return;
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.classList.toggle('dark', savedTheme === 'dark');
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Re-initialize icons after theme change
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }
}

// ============================================
// Language Switcher Functionality
// ============================================
function initLanguageSwitcher() {
    const langDropdown = document.getElementById('langDropdown');
    const langButton = document.getElementById('langButton');
    const langText = document.getElementById('langText');
    const langItems = document.querySelectorAll('.lang-dropdown-item');
    
    if (!langDropdown || !langButton || !langText) return;
    
    // Get saved language preference or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    updateLanguageUI(savedLang);
    
    // Toggle dropdown on button click
    langButton.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('open');
        const isOpen = langDropdown.classList.contains('open');
        langButton.setAttribute('aria-expanded', isOpen);
    });
    
    // Handle language selection
    langItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedLang = item.getAttribute('data-lang');
            if (selectedLang) {
                updateLanguageUI(selectedLang);
                localStorage.setItem('language', selectedLang);
                langDropdown.classList.remove('open');
                langButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (langDropdown && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('open');
            langButton.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Update language UI
    function updateLanguageUI(lang) {
        if (langText) {
            langText.textContent = lang === 'ar' ? 'العربية' : 'English';
        }
        
        // Keep dir="ltr" as per requirements
        // This can be expanded later for full Arabic translation with RTL support
        const html = document.documentElement;
        if (html) {
            html.setAttribute('dir', 'ltr');
        }
    }
}

// ============================================
// Hero Image Slider with Auto Cross-Fade
// ============================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds between slides
    let sliderInterval = null;
    
    /**
     * Cross-fade transition between slides
     * Uses opacity transition for smooth fade effect
     */
    function showSlide(index) {
        if (index < 0 || index >= slides.length) return;
        
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }
    
    /**
     * Auto-advance to next slide
     */
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Start auto-sliding
    sliderInterval = setInterval(nextSlide, slideInterval);
    
    // Pause on hover (optional enhancement)
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            if (sliderInterval) {
                clearInterval(sliderInterval);
                sliderInterval = null;
            }
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            // Restart interval only if it was cleared
            if (!sliderInterval) {
                sliderInterval = setInterval(nextSlide, slideInterval);
            }
        });
    }
}

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
function initSmoothScrolling() {
    // Handle all anchor links with smooth scrolling
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (!href || href === '#' || href === '#!') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset for sticky header
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Initialize Lucide Icons
// ============================================
function initIcons() {
    // Wait for Lucide to be available
    function createIconsWhenReady() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            // Retry after a short delay if Lucide isn't loaded yet
            setTimeout(createIconsWhenReady, 100);
        }
    }
    
    // Initial icon creation
    createIconsWhenReady();
    
    // Re-initialize icons after dynamic content changes (with debouncing to prevent loops)
    let iconUpdateTimeout = null;
    const observer = new MutationObserver(() => {
        // Debounce icon updates to prevent infinite loops
        if (iconUpdateTimeout) {
            clearTimeout(iconUpdateTimeout);
        }
        
        iconUpdateTimeout = setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                // Only update if Lucide is available and DOM is stable
                lucide.createIcons();
            }
        }, 100);
    });
    
    // Only observe if body exists
    const body = document.body;
    if (body) {
        observer.observe(body, {
            childList: true,
            subtree: true,
            // Only observe additions, not attribute changes to reduce triggers
            attributes: false
        });
    }
}

// ============================================
// Header Scroll Effect (Optional Enhancement)
// ============================================
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || window.scrollY;
        
        // Add shadow on scroll
        if (currentScroll > 10) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    }, { passive: true });
}

// ============================================
// Performance: Lazy Load Images (Optional)
// ============================================
function initLazyLoading() {
    // For future enhancement: lazy load images if needed
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img && img.dataset && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}
