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
    initLanguageToggle();
    initTranslation();
    initEventPageFeatures();
    initRegistrationForm();
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
    initSingleCarousel('joinNextEventCarousel');
    initSingleCarousel('ourPreviousHikesCarousel');
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
   Language Toggle & Translation System
   ============================================ */

/**
 * Translation dictionary for English and Arabic
 */
const translations = {
    en: {
        // Header & Navigation
        'about-us': 'About Us',
        'our-next-trips': 'Our Next Trips',
        'view-upcoming-hikes': 'View Upcoming Hikes',
        'view-details': 'View Details',
        'select-language': 'Select Language',
        
        // Hero Section (index.html)
        'join-organized-hiking-trips': 'Join organized hiking trips',
        'explore-nature-safely': 'Explore nature safely',
        'meet-like-minded-people': 'Meet like-minded people',
        'all-levels-welcome': 'All levels welcome',
        'local-guides-community': 'Local guides & community',
        'upcoming-hiking-events': 'Upcoming Hiking Events',
        
        // CTA Cards (index.html)
        'our-next-hike': 'Our Next Hike',
        'our-previous-hikes': 'Our Previous Hikes',
        'discover-breathtaking-trails': 'Discover breathtaking trails with experienced guides. Perfect for all skill levels.',
        'explore-past-adventures': 'Explore our past adventures including weekend adventures and sunset hikes. See what amazing experiences await you.',
        
        // Event Page (middleFirst.html) - Hero
        'event-hero-title': 'A full day for hike & visit three historical sites',
        'event-meta-date': 'Date:',
        'event-meta-location': 'Location:',
        'event-meta-level': 'Level:',
        'event-location-value': 'Wadi Al-Kafrein',
        'event-level-value': 'Intermediate',
        'event-description-1': 'Join us for a special day filled with nature and unforgettable moments! 🌿',
        'event-what-makes-special': 'What makes it special:',
        'event-what-makes-special-text': 'Experience hiking through water, visit historical sites, and enjoy a delicious traditional lunch prepared on-site.',
        'event-who-for': 'Who it is for:',
        'event-who-for-text': 'Perfect for adventure enthusiasts who love nature, history, and outdoor activities. Suitable for intermediate hikers.',
        
        // Event Info Section (middleFirst.html)
        'event-information': 'Event Information',
        'info-location': 'Location',
        'info-location-value': 'Wadi Al-Kafrein, Iraq Al-Amir',
        'info-start-time': 'Start Time',
        'info-start-time-1': '9:30 AM (Assembly)',
        'info-start-time-2': '10:00 AM (Departure)',
        'info-end-time': 'End Time',
        'info-end-time-value': '6:00 PM (Return to Meeting point)',
        'info-distance': 'Distance',
        'info-distance-1': '8km total',
        'info-distance-2': '~600m in water',
        'info-required-gear': 'Required Gear',
        'info-required-gear-value': 'Hiking shoes, backpack, water (2L+), snacks, powerBank, cap, sunblock, light jacket',
        'info-guide': 'Guide',
        'info-guide-value': 'Experienced local guide',
        
        // What's Included (middleFirst.html)
        'whats-included': 'What\'s Included',
        'included-transport': '✅ Transport',
        'included-local-guide': '✅ Local guide',
        'included-breakfast': '✅ Breakfast',
        'included-lunch': '✅ Lunch (Chicken Sajiyah with cream)',
        'included-tea': '✅ Tea with cardamom',
        'included-photographer': '✅ Photographer',
        
        // Safety & Rules (middleFirst.html)
        'safety-rules': 'Safety & Rules',
        'safety-fitness-requirements': 'Fitness Requirements',
        'safety-fitness-text': 'Intermediate level fitness required. You\'ll be walking 8km with approximately 600m in water (depth up to 0.5m).',
        'safety-age-limits': 'Age Limits',
        'safety-age-text': 'Suitable for adults and older teens. Please contact us for children under 16.',
        'safety-weather': 'Weather Disclaimer',
        'safety-weather-text': 'Event is weather-dependent. We\'ll notify participants 24 hours in advance if cancellation is needed.',
        'safety-clean': 'Leave the Place Clean',
        'safety-clean-text': 'Please respect nature and leave no trace. Take all your belongings and trash with you.',
        
        // Schedule (middleFirst.html)
        'plan-of-day': 'Plan of the Day',
        'schedule-assembly': 'Assembly Time',
        'schedule-assembly-location': '📍 Meeting point: In front of Al Ahli club',
        'schedule-departure': 'Departure',
        'schedule-departure-text': 'We\'ll start our journey to the destination',
        'schedule-breakfast': 'Breakfast on the Way',
        'schedule-breakfast-text': 'Start your morning with a delicious breakfast',
        'schedule-arrive': 'Arrive to Iraq Al-Amir',
        'schedule-arrive-text': 'Tour around Iraq Al-Amir (Qaser Al-Abed, Tubya caves and Muallaqat Ad-Dare)',
        'schedule-hiking': 'Start Hiking',
        'schedule-hiking-text': 'Begin hiking at Wadi Al-Kafrein. We\'ll walk around 600m in water (depth may reach up to 0.5m)',
        'schedule-lunch': 'Lunch',
        'schedule-lunch-text': 'We\'re going to prepare chicken Sajiyah with cream',
        'schedule-tea': '🍵 Tea with cardamom after lunch',
        'schedule-return': 'Return to Meeting Point',
        'schedule-return-text': 'We\'ll head back to meeting point',
        
        // What to Bring (middleFirst.html)
        'what-to-bring': 'What Should I Bring With Me?',
        'bring-smile': '😊 First of all, your beautiful smile',
        'bring-id': '🆔 Your ID or passport',
        'bring-backpack': '🎒 A comfortable backpack to carry your stuff',
        'bring-water': '💧 Water (preferably not less than 2 liters) / snacks / juice',
        'bring-powerbank': '🔋 Power bank',
        'bring-cap': '🧢 Cap',
        'bring-sunblock': '☀️ Sunblock',
        'bring-shoes': '👟 Hiking shoes with a strong sole',
        'bring-clothing': '👕 Comfortable clothing for hiking',
        'bring-jacket': '🧥 Light jacket',
        
        // Map Section (middleFirst.html)
        'meeting-point': 'Meeting Point',
        'meeting-point-text': '📍 Meeting point: In front of Al Ahli club',
        'meeting-point-note': 'For exact location, please contact us or check the Google Maps link',
        
        // Gallery (middleFirst.html)
        'event-gallery': 'Event Gallery',
        'gallery-subtitle': 'Join Next Event - Event-related images',
        
        // Price (middleFirst.html)
        'event-fee': 'Event Fee',
        'price-per-person': 'per person',
        
        // CTA Button (middleFirst.html)
        'join-this-event': 'Join This Event',
        
        // Registration Form (middleSecond.html)
        'registration-personal-details': 'Personal Details',
        'registration-full-name': 'Full Name',
        'registration-full-name-placeholder': 'Enter your full name',
        'registration-phone': 'Phone Number',
        'registration-phone-placeholder': 'Enter your phone number',
        'registration-email': 'Email Address',
        'registration-email-placeholder': 'Enter your email address',
        'registration-emergency-contact': 'Emergency Contact',
        'registration-emergency-note': 'In case of emergency',
        'registration-contact-name': 'Contact Name',
        'registration-contact-name-placeholder': 'Enter emergency contact name',
        'registration-contact-number': 'Contact Number',
        'registration-contact-number-placeholder': 'Enter emergency contact number',
        'registration-age-group': 'Age Group',
        'registration-age-18-30': '18-30',
        'registration-age-30-45': '30-45',
        'registration-age-45-plus': '45+',
        'registration-medical-condition': 'Medical Condition',
        'registration-medical-question': 'Do you have any medical condition we should be aware of?',
        'registration-medical-no': 'No',
        'registration-medical-yes': 'Yes',
        'registration-medical-details': 'Please provide details:',
        'registration-medical-placeholder': 'Please describe your medical condition',
        'registration-privacy': 'Your information is used only for event coordination and will not be shared.',
        'registration-submit': 'Submit',
        'registration-success-title': 'Registration Submitted Successfully!',
        'registration-success-text': 'Thank you for registering. We\'ve received your information and will contact you soon.',
        'required-field': '*',
        
        // Common Elements
        'skip-to-main': 'Skip to main content',
        'english': 'English',
        'arabic': 'العربية',
        'copyright': 'Copyright © 2026 Valleys Adventure'
    },
    ar: {
        // Header & Navigation
        'about-us': 'من نحن',
        'our-next-trips': 'رحلاتنا القادمة',
        'view-upcoming-hikes': 'عرض الرحلات القادمة',
        'view-details': 'عرض التفاصيل',
        'select-language': 'اختر اللغة',
        
        // Hero Section (index.html)
        'join-organized-hiking-trips': 'انضم إلى رحلات المشي المنظمة',
        'explore-nature-safely': 'استكشف الطبيعة بأمان',
        'meet-like-minded-people': 'تعرف على أشخاص متشابهين',
        'all-levels-welcome': 'جميع المستويات مرحب بها',
        'local-guides-community': 'مرشدون محليون ومجتمع',
        'upcoming-hiking-events': 'رحلات المشي القادمة',
        
        // CTA Cards (index.html)
        'our-next-hike': 'رحلتنا القادمة',
        'our-previous-hikes': 'رحلاتنا السابقة',
        'discover-breathtaking-trails': 'اكتشف مسارات خلابة مع مرشدين ذوي خبرة. مثالي لجميع مستويات المهارة.',
        'explore-past-adventures': 'استكشف مغامراتنا السابقة بما في ذلك مغامرات نهاية الأسبوع ومسيرات الغروب. شاهد التجارب الرائعة التي تنتظرك.',
        
        // Event Page (middleFirst.html) - Hero
        'event-hero-title': 'يوم كامل للمشي في البطبيعة وزيارة ثلاثة مواقع تاريخية',
        'event-meta-date': 'التاريخ:',
        'event-meta-location': 'الموقع:',
        'event-meta-level': 'المستوى:',
        'event-location-value': 'وادي الكفرين',
        'event-level-value': 'متوسط',
        'event-description-1': 'انضم إلينا ليوم خاص مليء بالطبيعة واللحظات التي لا تُنسى! 🌿',
        'event-what-makes-special': 'ما الذي يجعله مميزًا:',
        'event-what-makes-special-text': 'جرّب المشي عبر الماء، وزيارة المواقع التاريخية، والاستمتاع بغداء تقليدي لذيذ يتم تحضيره في الموقع.',
        'event-who-for': 'لمن هو مناسب:',
        'event-who-for-text': 'مثالي لعشاق المغامرة الذين يحبون الطبيعة والتاريخ والأنشطة الخارجية. مناسب للمتنزهين ذوي المستوى المتوسط.',
        
        // Event Info Section (middleFirst.html)
        'event-information': 'معلومات الحدث',
        'info-location': 'الموقع',
        'info-location-value': 'وادي الكفرين، عراق الأمير',
        'info-start-time': 'وقت البدء',
        'info-start-time-1': '9:30 صباحًا (التجمع)',
        'info-start-time-2': '10:00 صباحًا (الانطلاق)',
        'info-end-time': 'وقت الانتهاء',
        'info-end-time-value': '6:00 مساءً (العودة إلى نقطة الالتقاء)',
        'info-distance': 'المسافة',
        'info-distance-1': '8 كم إجمالي',
        'info-distance-2': '~600 م في الماء',
        'info-required-gear': 'المعدات المطلوبة',
        'info-required-gear-value': 'حذاء مشي، حقيبة ظهر، ماء (2 لتر+)، وجبات خفيفة، بنك طاقة، قبعة، واقي شمس، سترة خفيفة',
        'info-guide': 'المرشد',
        'info-guide-value': 'مرشد محلي ذو خبرة',
        
        // What's Included (middleFirst.html)
        'whats-included': 'ما هو متضمن',
        'included-transport': '✅ النقل',
        'included-local-guide': '✅ مرشد محلي',
        'included-breakfast': '✅ وجبة الإفطار',
        'included-lunch': '✅ الغداء (صاجية الدجاج مع الكريمة)',
        'included-tea': '✅ الشاي بالهيل',
        'included-photographer': '✅ مصور',
        
        // Safety & Rules (middleFirst.html)
        'safety-rules': 'السلامة والقواعد',
        'safety-fitness-requirements': 'متطلبات اللياقة البدنية',
        'safety-fitness-text': 'مطلوب مستوى لياقة متوسط. ستسير 8 كم مع حوالي 600 م في الماء (العمق يصل إلى 0.5 م).',
        'safety-age-limits': 'حدود العمر',
        'safety-age-text': 'مناسب للبالغين والمراهقين الأكبر سنًا. يرجى الاتصال بنا للأطفال تحت سن 16.',
        'safety-weather': 'تنبيه الطقس',
        'safety-weather-text': 'الحدث يعتمد على الطقس. سنخطر المشاركين قبل 24 ساعة إذا كان الإلغاء ضروريًا.',
        'safety-clean': 'اترك المكان نظيفًا',
        'safety-clean-text': 'يرجى احترام الطبيعة وعدم ترك أي أثر. خذ جميع متعلقاتك والقمامة معك.',
        
        // Schedule (middleFirst.html)
        'plan-of-day': 'خطة اليوم',
        'schedule-assembly': 'وقت التجمع',
        'schedule-assembly-location': '📍 نقطة الالتقاء: أمام نادي الأهلي',
        'schedule-departure': 'الانطلاق',
        'schedule-departure-text': 'سنبدأ رحلتنا إلى الوجهة',
        'schedule-breakfast': 'وجبة الإفطار في الطريق',
        'schedule-breakfast-text': 'ابدأ صباحك بوجبة إفطار لذيذة',
        'schedule-arrive': 'الوصول إلى عراق الأمير',
        'schedule-arrive-text': 'جولة حول عراق الأمير (قصر العبد، كهوف طوبيا ومعلقة الدير)',
        'schedule-hiking': 'بدء المشي',
        'schedule-hiking-text': 'ابدأ المشي في وادي الكفرين. سنسير حوالي 600 م في الماء (قد يصل العمق إلى 0.5 م)',
        'schedule-lunch': 'الغداء',
        'schedule-lunch-text': 'سنقوم بتحضير صاجية الدجاج مع الكريمة',
        'schedule-tea': '🍵 الشاي بالهيل بعد الغداء',
        'schedule-return': 'العودة إلى نقطة الالتقاء',
        'schedule-return-text': 'سنعود إلى نقطة الالتقاء',
        
        // What to Bring (middleFirst.html)
        'what-to-bring': 'ماذا يجب أن أحضر معي؟',
        'bring-smile': '😊 أولاً وقبل كل شيء، ابتسامتك الجميلة',
        'bring-id': '🆔 بطاقة الهوية أو جواز السفر',
        'bring-backpack': '🎒 حقيبة ظهر مريحة لحمل أغراضك',
        'bring-water': '💧 الماء (يفضل ألا يقل عن 2 لتر) / وجبات خفيفة / عصير',
        'bring-powerbank': '🔋 بنك طاقة',
        'bring-cap': '🧢 قبعة',
        'bring-sunblock': '☀️ واقي شمس',
        'bring-shoes': '👟 أحذية للمشي ذات نعل قوي',
        'bring-clothing': '👕 ملابس مريحة للمشي',
        'bring-jacket': '🧥 سترة خفيفة',
        
        // Map Section (middleFirst.html)
        'meeting-point': 'نقطة الالتقاء',
        'meeting-point-text': '📍 نقطة الالتقاء: أمام نادي الأهلي',
        'meeting-point-note': 'للحصول على الموقع الدقيق، يرجى الاتصال بنا أو التحقق من رابط خرائط جوجل',
        
        // Gallery (middleFirst.html)
        'event-gallery': 'معرض الحدث',
        'gallery-subtitle': 'انضم إلى الحدث القادم - صور متعلقة بالحدث',
        
        // Price (middleFirst.html)
        'event-fee': 'رسوم الحدث',
        'price-per-person': 'للشخص الواحد',
        
        // CTA Button (middleFirst.html)
        'join-this-event': 'انضم إلى هذا الحدث',
        
        // Registration Form (middleSecond.html)
        'registration-personal-details': 'البيانات الشخصية',
        'registration-full-name': 'الاسم الكامل',
        'registration-full-name-placeholder': 'أدخل اسمك الكامل',
        'registration-phone': 'رقم الهاتف',
        'registration-phone-placeholder': 'أدخل رقم هاتفك',
        'registration-email': 'عنوان البريد الإلكتروني',
        'registration-email-placeholder': 'أدخل عنوان بريدك الإلكتروني',
        'registration-emergency-contact': 'جهة اتصال الطوارئ',
        'registration-emergency-note': 'في حالات الطوارئ',
        'registration-contact-name': 'اسم جهة الاتصال',
        'registration-contact-name-placeholder': 'أدخل اسم جهة اتصال الطوارئ',
        'registration-contact-number': 'رقم جهة الاتصال',
        'registration-contact-number-placeholder': 'أدخل رقم جهة اتصال الطوارئ',
        'registration-age-group': 'الفئة العمرية',
        'registration-age-18-30': '18-30',
        'registration-age-30-45': '30-45',
        'registration-age-45-plus': '45+',
        'registration-medical-condition': 'الحالة الطبية',
        'registration-medical-question': 'هل لديك أي حالة طبية يجب أن نكون على علم بها؟',
        'registration-medical-no': 'لا',
        'registration-medical-yes': 'نعم',
        'registration-medical-details': 'يرجى تقديم التفاصيل:',
        'registration-medical-placeholder': 'يرجى وصف حالتك الطبية',
        'registration-privacy': 'تُستخدم معلوماتك فقط لتنسيق الحدث ولن يتم مشاركتها.',
        'registration-submit': 'إرسال',
        'registration-success-title': 'تم إرسال التسجيل بنجاح!',
        'registration-success-text': 'شكرًا لتسجيلك. لقد تلقينا معلوماتك وسنتواصل معك قريبًا.',
        'required-field': '*',
        
        // Common Elements
        'skip-to-main': 'تخطي إلى المحتوى الرئيسي',
        'english': 'English',
        'arabic': 'العربية',
        'copyright': 'حقوق النشر © 2026 مغامرات الوادي'
    }
};

/**
 * Initialize language dropdown selector
 */
function initLanguageToggle() {
    const languageDropdown = document.getElementById('languageDropdown');
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdownMenu = document.getElementById('languageDropdownMenu');
    const languageOptions = languageDropdownMenu?.querySelectorAll('.language-option');
    
    if (!languageDropdown || !languageToggle || !languageDropdownMenu || !languageOptions) return;
    
    // Toggle dropdown menu visibility
    languageToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isExpanded = languageToggle.getAttribute('aria-expanded') === 'true';
        languageDropdown.classList.toggle('active', !isExpanded);
        languageToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
            languageToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedLang = this.getAttribute('data-lang');
            
            // Update active state
            languageOptions.forEach(opt => {
                opt.classList.remove('active');
                opt.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Update current language indicator
            const currentLang = document.getElementById('currentLang');
            if (currentLang) {
                currentLang.textContent = selectedLang.toUpperCase();
            }
            
            // Close dropdown
            languageDropdown.classList.remove('active');
            languageToggle.setAttribute('aria-expanded', 'false');
            
            // Save language preference
            localStorage.setItem('language', selectedLang);
            
            // Apply translation
            applyTranslation(selectedLang);
            
            // Update HTML lang attribute
            document.documentElement.setAttribute('lang', selectedLang);
        });
    });
    
    // Close dropdown on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && languageDropdown.classList.contains('active')) {
            languageDropdown.classList.remove('active');
            languageToggle.setAttribute('aria-expanded', 'false');
            languageToggle.focus();
        }
    });
}

/**
 * Initialize translation system
 */
function initTranslation() {
    // Load saved language or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    
    // Update current language indicator
    const currentLang = document.getElementById('currentLang');
    if (currentLang) {
        currentLang.textContent = savedLang.toUpperCase();
    }
    
    // Update active language option in dropdown
    const languageOptions = document.querySelectorAll('.language-option[data-lang]');
    languageOptions.forEach(option => {
        if (option.getAttribute('data-lang') === savedLang) {
            option.classList.add('active');
            option.setAttribute('aria-selected', 'true');
        } else {
            option.classList.remove('active');
            option.setAttribute('aria-selected', 'false');
        }
    });
    
    // Apply translation
    applyTranslation(savedLang);
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', savedLang);
}

/**
 * Apply translations to all elements with data-translate attribute
 */
function applyTranslation(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            const translation = translations[lang][key];
            
            // Check if element is an input or textarea (has placeholder attribute)
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translation);
                } else {
                    element.value = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update direction for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl');
    }
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

/* ============================================
   Registration Form (middleSecond.html)
   ============================================ */

/**
 * Initialize registration form functionality
 * - Form validation
 * - Medical condition note field toggle
 * - Form submission handling
 */
function initRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) return;

    const medicalYes = document.getElementById('medicalYes');
    const medicalNo = document.getElementById('medicalNo');
    const medicalNoteGroup = document.getElementById('medicalNoteGroup');
    const medicalNote = document.getElementById('medicalNote');

    // Toggle medical note field based on medical condition selection
    if (medicalYes && medicalNo && medicalNoteGroup) {
        function toggleMedicalNote() {
            if (medicalYes.checked) {
                medicalNoteGroup.style.display = 'block';
                medicalNote.setAttribute('required', 'required');
            } else {
                medicalNoteGroup.style.display = 'none';
                medicalNote.removeAttribute('required');
                medicalNote.value = '';
            }
        }

        medicalYes.addEventListener('change', toggleMedicalNote);
        medicalNo.addEventListener('change', toggleMedicalNote);
    }

    // Form validation and submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Validate form
        if (validateForm()) {
            // Show success message
            showSuccessMessage();
            
            // Hide form
            registrationForm.style.display = 'none';
            
            // Scroll to success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Optional: Store form data in localStorage (for demo purposes)
            const formData = new FormData(registrationForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            localStorage.setItem('registrationData', JSON.stringify(formObject));
        }
    });

    // Real-time validation on input
    const inputs = registrationForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(input);
        });

        input.addEventListener('input', function() {
            // Clear error on input
            if (input.classList.contains('error')) {
                const errorId = input.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
                input.classList.remove('error');
            }
        });
    });
}

/**
 * Validate the entire form
 * @returns {boolean} True if form is valid, false otherwise
 */
function validateForm() {
    const form = document.getElementById('registrationForm');
    let isValid = true;

    // Required fields
    const requiredFields = [
        { id: 'fullName', name: 'Full Name' },
        { id: 'phoneNumber', name: 'Phone Number' },
        { id: 'emailAddress', name: 'Email Address' },
        { id: 'emergencyContactName', name: 'Emergency Contact Name' },
        { id: 'emergencyContactNumber', name: 'Emergency Contact Number' }
    ];

    // Validate required fields
    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!validateField(input, field.name)) {
            isValid = false;
        }
    });

    // Validate email format
    const emailInput = document.getElementById('emailAddress');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError('emailAddress', 'Please enter a valid email address');
            isValid = false;
        }
    }

    // Validate phone number format (basic validation)
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phoneInput.value) || phoneInput.value.length < 8) {
            showError('phoneNumber', 'Please enter a valid phone number');
            isValid = false;
        }
    }

    // Validate emergency contact number
    const emergencyPhoneInput = document.getElementById('emergencyContactNumber');
    if (emergencyPhoneInput && emergencyPhoneInput.value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(emergencyPhoneInput.value) || emergencyPhoneInput.value.length < 8) {
            showError('emergencyContactNumber', 'Please enter a valid phone number');
            isValid = false;
        }
    }

    // Validate age group
    const ageGroupInputs = document.querySelectorAll('input[name="ageGroup"]');
    let ageGroupSelected = false;
    ageGroupInputs.forEach(input => {
        if (input.checked) {
            ageGroupSelected = true;
        }
    });
    if (!ageGroupSelected) {
        showError('ageGroup', 'Please select an age group');
        isValid = false;
    }

    // Validate medical condition
    const medicalConditionInputs = document.querySelectorAll('input[name="medicalCondition"]');
    let medicalConditionSelected = false;
    medicalConditionInputs.forEach(input => {
        if (input.checked) {
            medicalConditionSelected = true;
        }
    });
    if (!medicalConditionSelected) {
        showError('medicalCondition', 'Please select an option');
        isValid = false;
    }

    // Validate medical note if "Yes" is selected
    const medicalYes = document.getElementById('medicalYes');
    const medicalNote = document.getElementById('medicalNote');
    if (medicalYes && medicalYes.checked && medicalNote) {
        if (!medicalNote.value.trim()) {
            showError('medicalNote', 'Please provide details about your medical condition');
            isValid = false;
        }
    }

    return isValid;
}

/**
 * Validate a single field
 * @param {HTMLElement} input - The input element to validate
 * @param {string} fieldName - The name of the field for error messages
 * @returns {boolean} True if field is valid, false otherwise
 */
function validateField(input, fieldName) {
    if (!input) return false;

    const value = input.value.trim();
    const isRequired = input.hasAttribute('required');

    // Check if required field is empty
    if (isRequired && !value) {
        const name = fieldName || input.previousElementSibling?.textContent || 'This field';
        showError(input.id, `${name} is required`);
        return false;
    }

    return true;
}

/**
 * Show error message for a field
 * @param {string} fieldId - The ID of the field
 * @param {string} message - The error message
 */
function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    if (input) {
        input.classList.add('error');
    }

    const errorId = fieldId + 'Error';
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear all error messages
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });

    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

/**
 * Show success message after form submission
 */
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
    }
}

