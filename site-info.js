/**
 * Site Information - Edit this file for easy manual updates
 * Change event details, contact info, and other site-specific data here.
 *
 * HOW TO USE:
 * - Edit the values below when you need to update contact info, event details, etc.
 * - For contact/event info used in HTML (phone links, WhatsApp), you may need to
 *   update those in the HTML files as well until they are wired to use SITE_INFO.
 * - This file is loaded on all pages; use it as your central reference.
 */

const SITE_INFO = {
    // ========== CONTACT ==========
    phone: '00962787426310',
    phoneDisplay: '00962787426310',
    whatsappNumber: '962787426310',
    whatsappUrl: 'https://api.whatsapp.com/send/?phone=962787426310&text&type=phone_number&app_absent=0',

    // ========== EVENT DETAILS ==========
    eventName: 'Sunrise Ride in Umm Qais',
    eventNameAr: 'رحلة شروق الشمس في أم قيس',
    location: 'Umm Qais, Irbid',
    locationAr: 'أم قيس · إربد',
    city: 'Irbid, Jordan',
    cityAr: 'إربد، الأردن',
    eventTime: '8:00 AM',
    eventTimeAr: '8:00 صباحاً',
    duration: '~4 Hours',
    durationAr: '~4 ساعات',

    // ========== BRAND ==========
    brandName: 'Cycling Every Where',
    brandNameAr: 'ركوب الدراجات في كل مكان',
    year: '2026',

    // ========== REGISTRATION ==========
    // Phone prefix shown in form (Jordan)
    phonePrefix: '00962',

    // ========== SOCIAL ==========
    instagram: '',  // Add Instagram URL if needed
};

// Expose for use in other scripts
if (typeof window !== 'undefined') {
    window.SITE_INFO = SITE_INFO;
}
