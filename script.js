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
    initHeroImageSlider();
    initImageCarousel();
    initEventPageFeatures();
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
   Hero Image Auto-Slider
   ============================================ */

/**
 * Initialize auto-sliding hero images
 * - Randomly cycles through available hero images
 * - Smooth fade transitions between images
 * - Auto-advances every 4 seconds
 */
function initHeroImageSlider() {
    const heroImages = document.querySelectorAll('.hero-bg-img');
    
    if (heroImages.length === 0) return;
    
    let currentIndex = 0;
    const totalImages = heroImages.length;
    
    // Function to show next image
    function showNextImage() {
        // Remove active class from current image
        heroImages[currentIndex].classList.remove('active');
        
        // Randomly select next image (can be same or different)
        const randomIndex = Math.floor(Math.random() * totalImages);
        currentIndex = randomIndex;
        
        // Add active class to new image
        heroImages[currentIndex].classList.add('active');
    }
    
    // Start auto-sliding (change image every 4 seconds)
    setInterval(showNextImage, 4000);
    
    // Initialize first image
    if (heroImages.length > 0) {
        heroImages[0].classList.add('active');
    }
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

/* ============================================
   Image Carousel (Swipable Album)
   ============================================ */

/**
 * Initialize swipable image carousel for all cards
 * - Supports touch swipe (mobile) and mouse drag (desktop)
 * - Auto-generates navigation dots
 * - Includes arrow navigation
 */
function initImageCarousel() {
    // Initialize all carousels
    initSingleCarousel('weekendAdventureCarousel');
    initSingleCarousel('joinNextEventCarousel');
    initSingleCarousel('sunsetHikesCarousel');
}

/**
 * Initialize a single carousel
 */
function initSingleCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const container = carousel.querySelector('.carousel-container');
    const images = carousel.querySelectorAll('.carousel-img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let translateX = 0;

    // Create navigation dots
    images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to image ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Update active image and dots
    function updateCarousel() {
        images.forEach((img, index) => {
            img.classList.toggle('active', index === currentIndex);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;
        updateCarousel();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Arrow button events
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.touches[0].clientX;
        translateX = currentX - startX;
    });

    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';

        // Swipe threshold (50px)
        if (Math.abs(translateX) > 50) {
            if (translateX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        translateX = 0;
    });

    // Mouse events for desktop
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        carousel.style.cursor = 'grabbing';
        e.preventDefault();
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        translateX = currentX - startX;
    });

    carousel.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';

        // Swipe threshold (50px)
        if (Math.abs(translateX) > 50) {
            if (translateX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        translateX = 0;
    });

    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            carousel.style.cursor = 'grab';
            translateX = 0;
        }
    });

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Set initial cursor
    carousel.style.cursor = 'grab';
}

/* ============================================
   Event Page Features (middleFirst.html)
   ============================================ */

/**
 * Initialize event page specific features
 * - Gallery lightbox
 * - Add to cart/favorites buttons
 */
function initEventPageFeatures() {
    initGalleryLightbox();
    initAddToCartFavorites();
}

/**
 * Initialize gallery lightbox functionality
 * - Opens images in modal view
 * - Supports navigation between images
 * - Keyboard navigation support
 */
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-img[data-lightbox]');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightboxModal || galleryImages.length === 0) return;

    let currentImageIndex = 0;
    const images = Array.from(galleryImages);

    // Open lightbox with specific image
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateNavigationButtons();
    }

    // Close lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Show previous image
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        updateNavigationButtons();
    }

    // Show next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        updateNavigationButtons();
    }

    // Update navigation button visibility
    function updateNavigationButtons() {
        if (images.length <= 1) {
            if (lightboxPrev) lightboxPrev.style.display = 'none';
            if (lightboxNext) lightboxNext.style.display = 'none';
        } else {
            if (lightboxPrev) lightboxPrev.style.display = 'block';
            if (lightboxNext) lightboxNext.style.display = 'block';
        }
    }

    // Add click event to each gallery image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
        // Make images keyboard accessible
        img.setAttribute('tabindex', '0');
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Previous button
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPreviousImage();
        });
    }

    // Next button
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });
    }

    // Close on background click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
}

/**
 * Initialize add to cart and favorites functionality
 * - Handles button clicks
 * - Shows user feedback
 * - Stores preferences in localStorage
 */
function initAddToCartFavorites() {
    const addToCartBtn = document.getElementById('addToCart');
    const addToFavoritesBtn = document.getElementById('addToFavorites');

    // Add to cart functionality
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Get event details
            const eventTitle = document.querySelector('.event-hero-title')?.textContent || 'Wadi Al-Kafrein Hike';
            const eventPrice = '18 JOD';
            
            // Store in localStorage (in a real app, this would be sent to a server)
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const eventItem = {
                id: 'al-kafrein-hike',
                title: eventTitle,
                price: eventPrice,
                date: 'FRIDAY, April 18',
                addedAt: new Date().toISOString()
            };

            // Check if already in cart
            const existingItem = cart.find(item => item.id === eventItem.id);
            if (!existingItem) {
                cart.push(eventItem);
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Visual feedback
                const originalText = addToCartBtn.textContent;
                addToCartBtn.textContent = '✓ Added to Cart!';
                addToCartBtn.style.backgroundColor = 'var(--accent-primary)';
                addToCartBtn.style.color = 'var(--bg-primary)';
                
                setTimeout(() => {
                    addToCartBtn.textContent = originalText;
                    addToCartBtn.style.backgroundColor = '';
                    addToCartBtn.style.color = '';
                }, 2000);
            } else {
                // Already in cart
                const originalText = addToCartBtn.textContent;
                addToCartBtn.textContent = 'Already in Cart';
                setTimeout(() => {
                    addToCartBtn.textContent = originalText;
                }, 2000);
            }
        });
    }

    // Add to favorites functionality
    if (addToFavoritesBtn) {
        addToFavoritesBtn.addEventListener('click', function() {
            // Get event details
            const eventTitle = document.querySelector('.event-hero-title')?.textContent || 'Wadi Al-Kafrein Hike';
            
            // Store in localStorage
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            const eventItem = {
                id: 'al-kafrein-hike',
                title: eventTitle,
                date: 'FRIDAY, April 18',
                addedAt: new Date().toISOString()
            };

            // Check if already in favorites
            const existingIndex = favorites.findIndex(item => item.id === eventItem.id);
            if (existingIndex === -1) {
                favorites.push(eventItem);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                
                // Visual feedback
                const originalText = addToFavoritesBtn.textContent;
                addToFavoritesBtn.textContent = '✓ Added to Favorites!';
                addToFavoritesBtn.style.backgroundColor = 'var(--accent-primary)';
                addToFavoritesBtn.style.color = 'var(--bg-primary)';
                
                setTimeout(() => {
                    addToFavoritesBtn.textContent = originalText;
                    addToFavoritesBtn.style.backgroundColor = '';
                    addToFavoritesBtn.style.color = '';
                }, 2000);
            } else {
                // Remove from favorites
                favorites.splice(existingIndex, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                
                // Visual feedback
                const originalText = addToFavoritesBtn.textContent;
                addToFavoritesBtn.textContent = 'Removed from Favorites';
                setTimeout(() => {
                    addToFavoritesBtn.textContent = originalText;
                }, 2000);
            }
        });
    }
}

