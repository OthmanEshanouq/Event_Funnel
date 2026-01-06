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
        initFAQAccordion();
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
    const html = document.documentElement;
    
    if (!langDropdown || !langButton || !langText) return;
    
    // Get saved language preference or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    updateLanguageUI(savedLang);
    applyTranslations(savedLang);
    
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
                applyTranslations(selectedLang);
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
        if (html) {
            // Switch page direction based on language
            html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            html.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
        }
    }
}

// ============================================
// Translations (EN/AR) and Application
// ============================================
function getTranslations() {
    return {
        en: {
            'nav.about': 'About Us',
            'hero.b1': '✓ Join organized cycling trips',
            'hero.b2': '✓ ride in nature, city, mountains & every where safely',
            'hero.b3': '✓ Meet Like-minded People',
            'hero.b4': '✓ All Levels Welcome',
            'hero.b5': '✓ Local Guides & Community',
            'trust.verified': 'Verified Guides',
            'trust.vehicle': 'Support Vehicle',
            'trust.rentals': 'Rental Bikes Available',
            'about.title': 'About Us',
            'about.text': 'We are a cycling organization that our goals is to meet new people, enjoying moments, explore the world, sport, and health.',
            'gallery.title': 'The Experience',
            'gallery.friendship': 'Friendship & Fun',
            'gallery.views': 'Stunning Views',
            'gallery.quality': 'Quality Bikes',
            'gallery.refresh': 'Refresh & Recharge',
            'prep.title': 'What to Bring',
            'prep.water': 'Water',
            'prep.helmet': 'Helmet (Safety)',
            'prep.tube': 'Spare Tube',
            'prep.clothes': 'Comfortable Clothes',
            'footer.copy': '© 2026 Cycling Every Where. All rights reserved.',
            'note.privacy': 'Your details are private and will not be shared. They are collected only for this event.',

            // Index secondary CTA
            'cta2.title': 'Ready to join the ride?',
            'cta2.text': 'Head to the information hub to confirm details and register.',
            'cta2.btn': 'Proceed to information page',

            // Hub bike CTA
            'hub.bike.title': 'No bike? No problem!',
            'hub.bike.text': 'You can request a bike rental while filling the registration form.',
            'hub.bike.btn': 'Registration & Rent A Bike',
            'hub.hero.title': 'Sunrise Ride in Umm Qais',
            'hub.hero.desc': 'Join our guided sunrise ride in Umm Qais over the next two Fridays. Roll out at 06:30 AM and enjoy ~4 hours of scenic cycling.',
            'hub.facts.city': 'Irbid, Jordan',
            'hub.facts.time': '06:30 AM',
            'hub.facts.duration': '~4 Hours',
            'hub.who.title': 'Who It’s For',
            'hub.who.text': 'All levels welcome. We’ll have lead cyclists for beginners and faster groups for pros—so you ride at the pace that feels great for you.',
            'hub.highlights.title': 'Experience Highlights',
            'hub.highlights.item1': 'Breathtaking views of the Sea of Galilee',
            'hub.highlights.item2': 'Historic Roman Ruins',
            'hub.highlights.item3': 'Fresh Breakfast in Nature',
            'hub.highlights.item4': 'Great Community Vibes',
            'hub.bring.title': 'What to Bring',
            'hub.bring.water': 'Water — 1.5L',
            'hub.bring.helmet': 'Helmet — Mandatory',
            'hub.bring.id': 'ID Card — Carry it',
            'hub.bring.sun': 'Sunscreen — SPF advised',
            'hub.safety.title': 'Safety',
            'hub.safety.item1': 'Certified guides',
            'hub.safety.item2': 'First-aid on site',
            'hub.safety.item3': 'Support vehicle follows the group',
            'hub.faq.title': 'FAQ',
            'hub.faq.q1': 'Is transportation provided?',
            'hub.faq.a1': 'Please arrange your own transport to Umm Qais. We’ll share the exact meet point after registration.',
            'hub.faq.q2': 'What if it rains?',
            'hub.faq.a2': 'We ride if conditions are safe. Otherwise, we’ll notify you with an updated plan.',
            'hub.faq.q3': 'Is it hilly?',
            'hub.faq.a3': 'Yes, but we have support! Pace leaders, rest stops, and a follow vehicle have you covered.',

            // Registration page
            'reg.title': 'Join Our Cycling Adventure',
            'reg.subtitle': 'Fill out the form below to register for our next cycling trip',
            'reg.personal': 'Personal Information',
            'reg.fullname': 'Full Name',
            'reg.email': 'Email Address',
            'reg.phone': 'Phone Number',
            'reg.rental': 'Bike Rental',
            'reg.needBike': 'Do you need to rent a bike?',
            'reg.yes': 'Yes',
            'reg.no': 'No',
            'reg.bikeType': 'Preferred Bike Type',
            'reg.selectBikeType': 'Select bike type',
            'reg.bikeType.mountain': 'Mountain Bike',
            'reg.bikeType.road': 'Road Bike',
            'reg.bikeType.hybrid': 'Hybrid Bike',
            'reg.bikeType.electric': 'Electric Bike',
            'reg.riderHeight': 'Rider Height (for sizing)',
            'reg.selectHeight': 'Select height',
            'reg.additional': 'Additional Information',
            'reg.experienceLevel': 'Experience Level',
            'reg.selectExperience': 'Select experience level',
            'reg.level.beginner': 'Beginner',
            'reg.level.intermediate': 'Intermediate',
            'reg.level.advanced': 'Advanced',
            'reg.emergency': 'Emergency Contact Name & Phone',
            'reg.notes': 'Special Requests or Notes',
            'reg.submit': 'Complete Registration',
            'reg.help': 'Need help? Contact us at',

            // Confirmation page
            'confirm.title': 'Registration Confirmed!',
            'confirm.subtitle': 'Thank you for registering with Cycling Every Where. We\'re excited to have you join our next cycling adventure!',
            'confirm.next': 'What\'s Next?',
            'confirm.step1': 'You\'ll receive a confirmation email with all the details within 24 hours.',
            'confirm.step2': 'We\'ll contact you to confirm the trip date and meeting location.',
            'confirm.step3': 'If you requested a bike rental, we\'ll confirm availability and sizing.',
            'confirm.backHome': 'Back to Home',
            'confirm.contact': 'Contact Us',
            'confirm.home': 'Home',
            'confirm.viewPage': 'View confirmation page'
        },
        ar: {
            'nav.about': 'من نحن',
            'hero.b1': '✓ انضم إلى رحلات دراجات منظمة',
            'hero.b2': '✓ قد في الطبيعة والمدينة والجبال وفي كل مكان بأمان',
            'hero.b3': '✓ تعرّف على أشخاص يشاركونك الشغف',
            'hero.b4': '✓ جميع المستويات مرحب بها',
            'hero.b5': '✓ مرشدون محليون ومجتمع داعم',
            'trust.verified': 'مرشدون معتمدون',
            'trust.vehicle': 'مركبة دعم مرافقة',
            'trust.rentals': 'دراجات للإيجار متاحة',
            'about.title': 'من نحن',
            'about.text': 'نحن منظمة ركوب دراجات هدفنا التعارف والاستمتاع واكتشاف العالم والرياضة والصحة.',
            'gallery.title': 'التجربة',
            'gallery.friendship': 'المرح والصداقة',
            'gallery.views': 'مناظر خلابة',
            'gallery.quality': 'دراجات عالية الجودة',
            'gallery.refresh': 'استراحة وانتعاش',
            'prep.title': 'ماذا تحضر معك',
            'prep.water': 'ماء',
            'prep.helmet': 'خوذة (سلامة)',
            'prep.tube': 'أنبوب احتياطي',
            'prep.clothes': 'ملابس مريحة',
            'footer.copy': '© 2026 دراجات في كل مكان. جميع الحقوق محفوظة.',
            'note.privacy': 'بياناتك خاصة ولن تتم مشاركتها. يتم جمعها لهذا الحدث فقط.',

            // Index secondary CTA
            'cta2.title': 'جاهز للانضمام للرحلة؟',
            'cta2.text': 'انتقل إلى صفحة المعلومات لتأكيد التفاصيل وإكمال التسجيل.',
            'cta2.btn': 'انتقل إلى صفحة المعلومات',

            // Hub bike CTA
            'hub.bike.title': 'ما عندك دراجة؟ ولا يهمك!',
            'hub.bike.text': 'يمكنك طلب استئجار دراجة أثناء تعبئة نموذج التسجيل.',
            'hub.bike.btn': 'التسجيل واستئجار دراجة',
            'hub.hero.title': 'جولة شروق الشمس في أم قيس',
            'hub.hero.desc': 'انضم إلى جولة شروق الشمس في أم قيس خلال الجمعة القادمة. الانطلاق 06:30 صباحاً لمدة تقارب 4 ساعات من الدراجات الخلابة.',
            'hub.facts.city': 'إربد، الأردن',
            'hub.facts.time': '06:30 صباحاً',
            'hub.facts.duration': 'حوالي 4 ساعات',
            'hub.who.title': 'لمن هذه الجولة؟',
            'hub.who.text': 'جميع المستويات مرحب بها. لدينا قادة للمبتدئين ومجموعات أسرع للمحترفين لتقود بالوتيرة المناسبة لك.',
            'hub.highlights.title': 'أهم التجارب',
            'hub.highlights.item1': 'مناظر خلابة لبحيرة طبريا',
            'hub.highlights.item2': 'آثار رومانية تاريخية',
            'hub.highlights.item3': 'فطور طازج في الطبيعة',
            'hub.highlights.item4': 'أجواء مجتمعية رائعة',
            'hub.bring.title': 'ماذا تحضر معك',
            'hub.bring.water': 'ماء — 1.5 لتر',
            'hub.bring.helmet': 'خوذة — إلزامية',
            'hub.bring.id': 'بطاقة هوية — احتفظ بها',
            'hub.bring.sun': 'واقي شمس — يفضّل SPF',
            'hub.safety.title': 'السلامة',
            'hub.safety.item1': 'مرشدون معتمدون',
            'hub.safety.item2': 'إسعافات أولية في الموقع',
            'hub.safety.item3': 'مركبة دعم ترافق المجموعة',
            'hub.faq.title': 'الأسئلة الشائعة',
            'hub.faq.q1': 'هل يتم توفير المواصلات؟',
            'hub.faq.a1': 'يرجى ترتيب مواصلاتك إلى أم قيس. سنشارك نقطة اللقاء بعد التسجيل.',
            'hub.faq.q2': 'ماذا لو كان هناك مطر؟',
            'hub.faq.a2': 'نقود إذا كانت الظروف آمنة، وإلا سنخبرك بخطة محدثة.',
            'hub.faq.q3': 'هل الطريق مرتفع؟',
            'hub.faq.a3': 'نعم، لكن لدينا دعم! قادة سرعة، محطات راحة، ومركبة متابعة تغطيك.',

            // Registration page
            'reg.title': 'انضم إلى مغامرة ركوب الدراجات',
            'reg.subtitle': 'املأ النموذج أدناه للتسجيل في رحلتنا القادمة',
            'reg.personal': 'المعلومات الشخصية',
            'reg.fullname': 'الاسم الكامل',
            'reg.email': 'البريد الإلكتروني',
            'reg.phone': 'رقم الهاتف',
            'reg.rental': 'استئجار دراجة',
            'reg.needBike': 'هل تحتاج إلى استئجار دراجة؟',
            'reg.yes': 'نعم',
            'reg.no': 'لا',
            'reg.bikeType': 'نوع الدراجة المفضل',
            'reg.selectBikeType': 'اختر نوع الدراجة',
            'reg.bikeType.mountain': 'دراجة جبلية',
            'reg.bikeType.road': 'دراجة طريق',
            'reg.bikeType.hybrid': 'دراجة هجينة',
            'reg.bikeType.electric': 'دراجة كهربائية',
            'reg.riderHeight': 'طول الراكب (للمقاس)',
            'reg.selectHeight': 'اختر الطول',
            'reg.additional': 'معلومات إضافية',
            'reg.experienceLevel': 'مستوى الخبرة',
            'reg.selectExperience': 'اختر مستوى الخبرة',
            'reg.level.beginner': 'مبتدئ',
            'reg.level.intermediate': 'متوسط',
            'reg.level.advanced': 'متقدم',
            'reg.emergency': 'اسم ورقم التواصل للطوارئ',
            'reg.notes': 'ملاحظات أو طلبات خاصة',
            'reg.submit': 'إتمام التسجيل',
            'reg.help': 'تحتاج مساعدة؟ اتصل بنا على',

            // Confirmation page
            'confirm.title': 'تم تأكيد التسجيل!',
            'confirm.subtitle': 'شكراً لتسجيلك مع Cycling Every Where. يسعدنا انضمامك إلى مغامرتنا القادمة!',
            'confirm.next': 'ما الخطوة التالية؟',
            'confirm.step1': 'ستصلك رسالة تأكيد بجميع التفاصيل خلال 24 ساعة.',
            'confirm.step2': 'سنتواصل لتأكيد موعد الرحلة ومكان التجمع.',
            'confirm.step3': 'إن طلبت دراجة للإيجار، سنؤكد التوفر والمقاس.',
            'confirm.backHome': 'العودة إلى الرئيسية',
            'confirm.contact': 'تواصل معنا',
            'confirm.home': 'الرئيسية',
            'confirm.viewPage': 'عرض صفحة التأكيد'
        }
    };
}

function applyTranslations(lang) {
    const translations = getTranslations();
    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
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

// ============================================
// FAQ Accordion (single open, accessible)
// ============================================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    let openItem = null;

    faqItems.forEach((item, idx) => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!button || !answer) return;

        const answerId = answer.id || `faq-answer-${idx}`;
        answer.id = answerId;
        button.setAttribute('aria-controls', answerId);
        button.setAttribute('aria-expanded', 'false');
        answer.setAttribute('hidden', 'true');
        answer.style.maxHeight = '0px';
        answer.style.transition = 'max-height 0.3s ease';

        function close(itemToClose) {
            const btn = itemToClose.querySelector('.faq-question');
            const ans = itemToClose.querySelector('.faq-answer');
            if (!btn || !ans) return;
            btn.setAttribute('aria-expanded', 'false');
            ans.setAttribute('hidden', 'true');
            ans.style.maxHeight = '0px';
            itemToClose.classList.remove('open');
            const indicator = btn.querySelector('.faq-indicator');
            if (indicator) indicator.textContent = '+';
        }

        function open(itemToOpen) {
            const btn = itemToOpen.querySelector('.faq-question');
            const ans = itemToOpen.querySelector('.faq-answer');
            if (!btn || !ans) return;
            btn.setAttribute('aria-expanded', 'true');
            ans.removeAttribute('hidden');
            ans.style.maxHeight = ans.scrollHeight + 'px';
            itemToOpen.classList.add('open');
            const indicator = btn.querySelector('.faq-indicator');
            if (indicator) indicator.textContent = '–';
        }

        function toggle() {
            if (openItem && openItem !== item) {
                close(openItem);
            }
            if (item.classList.contains('open')) {
                close(item);
                openItem = null;
            } else {
                open(item);
                openItem = item;
            }
        }

        button.addEventListener('click', toggle);
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
}
