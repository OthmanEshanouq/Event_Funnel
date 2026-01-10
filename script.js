/**
 * Cycling Every Where - Main JavaScript
 * Production-ready theme toggle and language switcher
 * 
 * ARCHITECTURE:
 * - Single shared JS file used by all pages
 * - Theme and language applied early via inline script in <head>
 * - Event delegation for reliability across page navigations
 * - localStorage for persistence
 */

// ============================================
// EARLY THEME APPLICATION (runs in <head>)
// This prevents flash of wrong theme
// ============================================
(function applyThemeEarly() {
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    
    if (html) {
        // Remove both classes first
        html.classList.remove('dark', 'light');
        // Apply saved theme
        html.classList.add(savedTheme);
    }
})();

// ============================================
// EARLY LANGUAGE APPLICATION (runs in <head>)
// This prevents flash of wrong language
// ============================================
(function applyLanguageEarly() {
    if (typeof window === 'undefined') return;
    
    const savedLang = localStorage.getItem('language') || 'en';
    const html = document.documentElement;
    
    if (html) {
        html.setAttribute('lang', savedLang);
        html.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    }
})();

// ============================================
// INITIALIZATION
// ============================================
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
        initRegistrationForm();
    }
})();

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
/**
 * WHY IT WAS BREAKING:
 * 1. Button cloning was removing event listeners
 * 2. Multiple event listeners were being attached on each page load
 * 3. Theme wasn't applied early enough, causing flash
 * 4. Icon re-initialization was interfering with button state
 * 
 * HOW IT'S FIXED:
 * 1. Single event delegation on document (works across all pages)
 * 2. Theme applied early in <head> to prevent flash
 * 3. Button state protected on every click
 * 4. No cloning - direct event handling
 */

let themeToggleInitialized = false;

function initThemeToggle() {
    const html = document.documentElement;
    if (!html) return;
    
    // Apply saved theme (in case inline script didn't run)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.classList.remove('dark', 'light');
    html.classList.add(savedTheme);
    
    // Set up event delegation ONCE (works across all pages)
    if (!themeToggleInitialized) {
        document.addEventListener('click', function(e) {
            // Check if click is on theme toggle button or its children
            const themeToggle = e.target.closest('#themeToggle');
            if (themeToggle) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get current theme state
                const isDark = html.classList.contains('dark');
                
                // Toggle theme
                html.classList.remove('dark', 'light');
                const newTheme = isDark ? 'light' : 'dark';
                html.classList.add(newTheme);
                
                // Save to localStorage
                localStorage.setItem('theme', newTheme);
                
                // Update button accessibility
                themeToggle.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
                themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'dark' : 'light'} mode`);
                
                // Ensure button is always enabled and clickable
                themeToggle.disabled = false;
                themeToggle.removeAttribute('disabled');
                themeToggle.style.pointerEvents = 'auto';
                themeToggle.style.cursor = 'pointer';
                themeToggle.setAttribute('aria-disabled', 'false');
                
                // Re-initialize icons after theme change
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }, true); // Use capture phase for reliability
        
        themeToggleInitialized = true;
    }
    
    // Ensure button is properly initialized on each page load
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.disabled = false;
        themeToggle.removeAttribute('disabled');
        themeToggle.style.pointerEvents = 'auto';
        themeToggle.style.cursor = 'pointer';
        themeToggle.setAttribute('type', 'button');
        themeToggle.setAttribute('aria-disabled', 'false');
        
        // Set initial aria-pressed state
        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        themeToggle.setAttribute('aria-pressed', currentTheme === 'dark' ? 'true' : 'false');
        
        // Keyboard support
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.click();
            }
        });
    }
}

// ============================================
// LANGUAGE SWITCHER FUNCTIONALITY
// ============================================
/**
 * WHY IT WAS BREAKING:
 * 1. Language wasn't applied early enough on page load
 * 2. Translations weren't applied to all pages consistently
 * 3. Event listeners were re-attached on each page load
 * 4. Language state wasn't persisted properly
 * 
 * HOW IT'S FIXED:
 * 1. Language applied early in <head> to prevent flash
 * 2. Single event delegation for language selection
 * 3. Translations applied on every page load
 * 4. Proper RTL/LTR handling
 */

let languageSwitcherInitialized = false;

function initLanguageSwitcher() {
    const langDropdown = document.getElementById('langDropdown');
    const langButton = document.getElementById('langButton');
    const langText = document.getElementById('langText');
    const html = document.documentElement;
    
    if (!html) return;
    
    // Get saved language or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    
    // Apply language immediately
    html.setAttribute('lang', savedLang);
    html.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    
    // Update UI and apply translations
    updateLanguageUI(savedLang);
    applyTranslations(savedLang);
    
    // Set up language switcher (only once)
    if (!languageSwitcherInitialized && langDropdown && langButton && langText) {
        // Toggle dropdown on button click
        langButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = langDropdown.classList.toggle('open');
            langButton.setAttribute('aria-expanded', isOpen);
        });
        
        // Handle language selection via event delegation
        document.addEventListener('click', function(e) {
            const langItem = e.target.closest('.lang-dropdown-item');
            if (langItem && langDropdown.contains(langItem)) {
                const selectedLang = langItem.getAttribute('data-lang');
                if (selectedLang && (selectedLang === 'en' || selectedLang === 'ar')) {
                    // Save language
                    localStorage.setItem('language', selectedLang);
                    
                    // Apply language
                    html.setAttribute('lang', selectedLang);
                    html.setAttribute('dir', selectedLang === 'ar' ? 'rtl' : 'ltr');
                    
                    // Update UI and translations
                    updateLanguageUI(selectedLang);
                    applyTranslations(selectedLang);
                    
                    // Close dropdown
                    langDropdown.classList.remove('open');
                    langButton.setAttribute('aria-expanded', 'false');
                }
            }
            
            // Close dropdown when clicking outside
            if (langDropdown && !langDropdown.contains(e.target) && langDropdown.classList.contains('open')) {
                langDropdown.classList.remove('open');
                langButton.setAttribute('aria-expanded', 'false');
            }
        });
        
        languageSwitcherInitialized = true;
    }
    
    // Update language UI helper
    function updateLanguageUI(lang) {
        if (langText) {
            langText.textContent = lang === 'ar' ? 'العربية' : 'English';
        }
    }
}

// ============================================
// TRANSLATIONS (EN/AR) AND APPLICATION
// ============================================
/**
 * Single source of truth for all translations
 * Used across all pages
 */
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
            'note.privacy': 'Your information is kept confidential and will only be used for organizing and managing this event.',
            
            // Index secondary CTA
            'cta.indexTitle': 'Ready for an adventure?',
            'cta.indexButton': 'Proceed to information page',
            
            // Information Hub (middleFirst.html)
            'hub.hero.tag': 'Umm Qais · Irbid',
            'hub.hero.title': 'Sunrise Ride in Umm Qais',
            'hub.hero.desc': 'Join our guided sunrise ride in Umm Qais over the next two Fridays. Roll out at 06:30 AM and enjoy ~4 hours of scenic cycling.',
            'hub.facts.city': 'Irbid, Jordan',
            'hub.facts.time': '06:30 AM',
            'hub.facts.duration': '~4 Hours',
            'hub.who.title': 'Who It\'s For',
            'hub.who.text': 'All levels welcome. We\'ll have lead cyclists for beginners and faster groups for pros—so you ride at the pace that feels great for you.',
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
            'hub.faq.a1': 'Please arrange your own transport to Umm Qais. We\'ll share the exact meet point after registration.',
            'hub.faq.q2': 'What if it rains?',
            'hub.faq.a2': 'We ride if conditions are safe. Otherwise, we\'ll notify you with an updated plan.',
            'hub.faq.q3': 'Is it hilly?',
            'hub.faq.a3': 'Yes, but we have support! Pace leaders, rest stops, and a follow vehicle have you covered.',
            'hub.bike.title': 'No bike? No problem!',
            'hub.bike.text': 'You can request a bike rental while filling the registration form.',
            'hub.bike.btn': 'Registration & Rent A Bike',
            'hub.cta.button': 'Registration & Rent A Bike',
            
            // Registration page
            'reg.tag': 'Cycling Every Where',
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
            'reg.thankYouTitle': 'Thank you for registering! We\'re excited to have you join our cycling adventure.',
            'reg.thankYouFollowUp': 'Our team will contact you shortly to confirm your spot.',
            'note.privacyReg': 'Your information is kept confidential and will only be used for organizing and managing this event.',
            
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
            'note.privacy': 'معلوماتك محفوظة بسرية ولن تُستخدم إلا لتنظيم وإدارة هذا الحدث.',
            
            // Index secondary CTA
            'cta.indexTitle': 'جاهز للانضمام للرحلة؟',
            'cta.indexButton': 'الانتقال إلى صفحة المعلومات',
            
            // Information Hub (middleFirst.html)
            'hub.hero.tag': 'أم قيس · إربد',
            'hub.hero.title': 'رحلة شروق الشمس في أم قيس',
            'hub.hero.desc': 'انضم إلى رحلة شروق الشمس الموجهة في أم قيس خلال الجمعة القادمتين. انطلق في الساعة 06:30 صباحاً واستمتع بـ ~4 ساعات من ركوب الدراجات الخلابة.',
            'hub.facts.city': 'إربد، الأردن',
            'hub.facts.time': '06:30 صباحاً',
            'hub.facts.duration': '~4 ساعات',
            'hub.who.title': 'لمن هذه الرحلة',
            'hub.who.text': 'جميع المستويات مرحب بها. سيكون لدينا قادة دراجات للمبتدئين ومجموعات أسرع للمحترفين—حتى تركب بالسرعة التي تناسبك.',
            'hub.highlights.title': 'أبرز التجربة',
            'hub.highlights.item1': 'مناظر خلابة لبحر الجليل',
            'hub.highlights.item2': 'آثار رومانية تاريخية',
            'hub.highlights.item3': 'إفطار طازج في الطبيعة',
            'hub.highlights.item4': 'أجواء مجتمعية رائعة',
            'hub.bring.title': 'ماذا تحضر معك',
            'hub.bring.water': 'ماء — 1.5 لتر',
            'hub.bring.helmet': 'خوذة — إلزامية',
            'hub.bring.id': 'بطاقة هوية — احملها',
            'hub.bring.sun': 'واقي شمس — يُنصح بـ SPF',
            'hub.safety.title': 'السلامة',
            'hub.safety.item1': 'مرشدون معتمدون',
            'hub.safety.item2': 'إسعافات أولية في الموقع',
            'hub.safety.item3': 'مركبة دعم تتبع المجموعة',
            'hub.faq.title': 'الأسئلة الشائعة',
            'hub.faq.q1': 'هل يتم توفير المواصلات؟',
            'hub.faq.a1': 'يرجى ترتيب مواصلاتك إلى أم قيس. سنشارك نقطة اللقاء بعد التسجيل.',
            'hub.faq.q2': 'ماذا لو كان هناك مطر؟',
            'hub.faq.a2': 'نقود إذا كانت الظروف آمنة، وإلا سنخبرك بخطة محدثة.',
            'hub.faq.q3': 'هل الطريق مرتفع؟',
            'hub.faq.a3': 'نعم، لكن لدينا دعم! قادة سرعة، محطات راحة، ومركبة متابعة تغطيك.',
            'hub.bike.title': 'لا تملك دراجة؟ لا مشكلة!',
            'hub.bike.text': 'يمكنك طلب استئجار دراجة أثناء ملء نموذج التسجيل.',
            'hub.bike.btn': 'التسجيل واستئجار دراجة',
            'hub.cta.button': 'التسجيل واستئجار دراجة',
            
            // Registration page
            'reg.tag': 'Cycling Every Where',
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
            'reg.thankYouTitle': 'شكراً لتسجيلك! يسعدنا انضمامك إلى مغامرة ركوب الدراجات.',
            'reg.thankYouFollowUp': 'سيتواصل معك فريقنا قريباً لتأكيد مكانك.',
            'note.privacyReg': 'معلوماتك محفوظة بسرية ولن تُستخدم إلا لتنظيم وإدارة هذا الحدث.',
            
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

/**
 * Apply translations to all elements with data-i18n attribute
 * Runs on every page load to ensure all content is translated
 */
function applyTranslations(lang) {
    const translations = getTranslations();
    const dict = translations[lang] || translations.en;
    
    // Apply to all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            // Preserve HTML if needed, otherwise use textContent
            if (el.children.length > 0) {
                // Has children, update text content only
                const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === 3);
                textNodes.forEach(node => {
                    if (node.textContent.trim()) {
                        node.textContent = dict[key];
                    }
                });
            } else {
                el.textContent = dict[key];
            }
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
    
    function showSlide(index) {
        if (index < 0 || index >= slides.length) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    showSlide(0);
    sliderInterval = setInterval(nextSlide, slideInterval);
    
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            if (sliderInterval) {
                clearInterval(sliderInterval);
                sliderInterval = null;
            }
        });
        
        heroSlider.addEventListener('mouseleave', () => {
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
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#' || href === '#!') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Lucide Icons Initialization
// ============================================
function initIcons() {
    function createIconsWhenReady() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            setTimeout(createIconsWhenReady, 100);
        }
    }
    
    createIconsWhenReady();
    
    // Re-initialize icons after dynamic content changes (with debouncing)
    let iconUpdateTimeout = null;
    const observer = new MutationObserver(() => {
        if (iconUpdateTimeout) {
            clearTimeout(iconUpdateTimeout);
        }
        
        iconUpdateTimeout = setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 100);
    });
    
    const body = document.body;
    if (body) {
        observer.observe(body, {
            childList: true,
            subtree: true,
            attributes: false
        });
    }
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// ============================================
// Lazy Loading for Images
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// ============================================
// FAQ Accordion
// ============================================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all other items (single-open behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('open');
            const newIsOpen = item.classList.contains('open');
            question.setAttribute('aria-expanded', newIsOpen);
            
            if (newIsOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
        
        // Keyboard support
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// ============================================
// Registration Form Handler
// ============================================
function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (!form) return;
    
    let isSubmitting = false;
    
    // Handle bike rental conditional fields
    const needBikeRadios = form.querySelectorAll('input[name="needBike"]');
    const bikeRentalFields = form.querySelector('#bikeRentalFields');
    const bikeTypeSelect = document.getElementById('bikeType');
    const riderHeightSelect = document.getElementById('riderHeight');
    
    function toggleBikeRentalFields() {
        const selectedValue = Array.from(needBikeRadios).find(r => r.checked)?.value;
        
        if (selectedValue === 'yes' && bikeRentalFields) {
            bikeRentalFields.classList.remove('hidden');
            if (bikeTypeSelect) bikeTypeSelect.setAttribute('required', 'required');
            if (riderHeightSelect) riderHeightSelect.setAttribute('required', 'required');
        } else if (selectedValue === 'no' && bikeRentalFields) {
            bikeRentalFields.classList.add('hidden');
            if (bikeTypeSelect) {
                bikeTypeSelect.removeAttribute('required');
                bikeTypeSelect.value = '';
            }
            if (riderHeightSelect) {
                riderHeightSelect.removeAttribute('required');
                riderHeightSelect.value = '';
            }
        }
    }
    
    needBikeRadios.forEach(radio => {
        radio.addEventListener('change', toggleBikeRentalFields);
    });
    
    toggleBikeRentalFields();
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (isSubmitting) {
            return;
        }
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        isSubmitting = true;
        
        const inputs = form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            input.disabled = true;
            input.setAttribute('aria-disabled', 'true');
        });
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Registration Data:', data);
        
        // Hide the form header
        const formHeader = document.getElementById('formHeader');
        if (formHeader) {
            formHeader.style.display = 'none';
            formHeader.setAttribute('aria-hidden', 'true');
        }
        
        // Hide the form completely
        form.style.display = 'none';
        form.setAttribute('aria-hidden', 'true');
        
        // Show thank you message
        if (thankYouMessage) {
            thankYouMessage.classList.remove('hidden');
            thankYouMessage.setAttribute('aria-live', 'polite');
            thankYouMessage.removeAttribute('aria-hidden');
            
            setTimeout(() => {
                thankYouMessage.focus();
                thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    });
}
