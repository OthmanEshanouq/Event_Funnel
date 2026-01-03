## 📋 Project Overview

**Website Name:** Valley's Adventure  
**Type:** Outdoor & Adventure Hiking Trip
**Style:** Construction/Interior Design adapted for Outdoor & Adventure branding

---

## 🎯 Project Goals

- Create a modern, clean, professional website for hiking/adventure trips
- Fully responsive design (desktop, tablet, mobile)
- Implement dark/light mode theme toggle
- Showcase hiking trips with swipable image galleries
- Guide users to view upcoming hiking events

---

## 📐 Website Structure

### Header (Sticky Navigation)
```
┌───────────────────────────────────────────────────────────────────────────────┐
│  [Logo]  About Us | Our Next Trips   Valleys Adventure   [☀️/🌙] [📅] [☰]   │ 
└───────────────────────────────────────────────────────────────────────────────┘


**Components:**
- **Left Side:**
  - Clickable logo image (acts as Home link)
  - Navigation links: "About Us", "Our Next Trips"
  
- **Center:**
  - Brand name: "Valleys Adventure" (centered)
  
- **Right Side:**
  - Day/Night mode toggle (sun/moon icons)
  - Calendar icon (clickable)
  - Hamburger menu (mobile only)

**Mobile View:**
- Navigation converts to hamburger menu
- Brand name moves to top row
- Toggle and calendar remain visible

---

### Main Content Area

#### 1. Background Watermark
- Logo image with low opacity (0.03-0.05)
- Fixed position covering entire page
- Hidden behind hero section (z-index management)

#### 2. Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    [random images]                          │
│                    (Dark Overlay)                           │
│                                                             │
│              Join organized hiking trips                    │
│              Explore nature safely                          │
│              Meet like-minded people                        │
│              All levels welcome                             │
│              Local guides & community                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Full-width hero section
- random images (auto slide)
- Dark overlay for text readability (opacity: 0.15 light / 0.25 dark)
- Hero text with smooth fade-up animations
- White text with enhanced shadow for visibility

#### 3. CTA Section (Call To Action)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              [View Upcoming Hikes Button]                   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │                   │
│  │          │  │          │  │          │                   │
│  │ Join     │  │ Weekend  │  │ Sunset   │                   │
│  │ Next     │  │ Adventure│  │ Hikes    │                   │
│  │ Event    │  │          │  │          │                   │
│  │          │  │          │  │          │                   │
│  │ [View    │  │ [View    │  │ [View    │                   │
│  │ Details] │  │ Details] │  │ Details] │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Background: 70% transparent (30% opacity)
- Primary CTA button: "View Upcoming Hikes"
- Three secondary CTA cards with swipable image galleries

**Card 1: Join Next Event**
- 21 Al_Kafrein images (swipable carousel)
- Images: Al_Kafrein 1.jpg through al_kafrein 21.jpg

**Card 2: Weekend Adventure**
- 21 Zoubia images (swipable carousel)
- Images: Zoubia 1.jpg through Zoubia 21.jpg

**Card 3: Sunset Hikes**
- 4 images (swipable carousel)
- Main image: sunset.png
- 3 king Talal dam images

**Carousel Features:**
- Touch swipe support (mobile)
- Mouse drag support (desktop)
- Navigation arrows (prev/next)
- Navigation dots
- Smooth transitions
- Keyboard navigation (arrow keys)

#### 4. Footer
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Copyright © 2026 Valleys Adventure    [📷] [💬] 00962787426310    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

```

**Components:**
- Copyright notice
- Instagram icon (link placeholder)
- WhatsApp icon (with phone link)
- Phone number: 00962787426310

---

## 🛠️ Development Steps

### Step 1: Initial Setup
- ✅ Created semantic HTML5 structure
- ✅ Set up CSS with CSS variables for theming
- ✅ Created JavaScript file for interactivity
- ✅ Added clear comments throughout code

### Step 2: Header Implementation
- ✅ Created sticky header with logo
- ✅ Added navigation links (About Us, Our Next Trips)
- ✅ Implemented day/night mode toggle with animated icons
- ✅ Added calendar icon
- ✅ Created hamburger menu for mobile
- ✅ Added "Valleys Adventure" brand name in center

### Step 3: Background & Hero Section
- ✅ Added background logo watermark (low opacity)
- ✅ Implemented hero section with background video
- ✅ Added dark overlay for text readability
- ✅ Created hero text with 5 lines and animations
- ✅ Configured video playback speed (0.25x)
- ✅ Reduced overlay opacity for better video visibility

### Step 4: CTA Section
- ✅ Created primary CTA button
- ✅ Built three CTA cards with image placeholders
- ✅ Made section background 70% transparent
- ✅ Linked all navigation elements to CTA section

### Step 5: Image Carousels
- ✅ Implemented swipable carousel functionality
- ✅ Added al_kafrein images to "Join Next Event" card (21 images)
- ✅ Added zoubia images to "Weekend Adventure" card (21 images)
- ✅ Added sunset.png + king talal dam images to "Sunset Hikes" card (4 images)
- ✅ Created navigation dots and arrows
- ✅ Added touch and mouse drag support

### Step 6: Assets Integration
- ✅ Updated logo paths to use assets folder
- ✅ Integrated hero video from assets
- ✅ Added all image assets to respective carousels
- ✅ Set sunset.png as main image for Sunset Hikes

### Step 7: Styling & Theming
- ✅ Implemented CSS variables for light/dark themes
- ✅ Created smooth theme transitions
- ✅ Made header 90% transparent
- ✅ Adjusted video overlay opacity
- ✅ Enhanced hero text visibility
- ✅ Made watermark logo 200% larger

### Step 8: Responsive Design
- ✅ Mobile hamburger menu
- ✅ Responsive grid layouts
- ✅ Mobile-optimized carousels
- ✅ Responsive typography
- ✅ Touch-friendly interactions

### Step 9: Footer
- ✅ Created minimal footer
- ✅ Added social media icons (SVG)
- ✅ Added phone number with link
- ✅ Styled for both light and dark modes

### Step 10: Navigation & Linking
- ✅ Linked "Our Next Trips" to CTA section
- ✅ Linked "View Upcoming Hikes" button to CTA section
- ✅ Linked calendar icon to CTA section
- ✅ Implemented smooth scroll with header offset

### Step 11: Event Details Page (middleFirst.html)
- ✅ Created event details page with same header and footer structure
- ✅ Implemented hero section with auto-sliding Al Kafrein images
- ✅ Added event information grid (location, times, distance, gear, group size, guide)
- ✅ Created "What's Included / Not Included" section
- ✅ Added Safety & Rules section (fitness requirements, age limits, weather disclaimer, leave no trace)
- ✅ Implemented schedule timeline with all day activities
- ✅ Added "What to Bring" checklist section
- ✅ Integrated Google Maps embed for meeting point (Al Ahli Sports Club)
- ✅ Created event gallery with lightbox modal functionality
- ✅ Added price section (18 JOD per person)
- ✅ Implemented single CTA button "Join This Event" linking to registration page
- ✅ Added all content from wireframe page 2 and wireframe page 3

### Step 12: Registration Page (middleSecond.html)
- ✅ Created registration form page with same header and footer
- ✅ Implemented personal details section (name, phone, email)
- ✅ Added emergency contact section
- ✅ Created age group selection (radio buttons)
- ✅ Added medical condition section with conditional textarea
- ✅ Implemented form validation and error handling
- ✅ Added success message display
- ✅ Styled form with proper spacing and visual hierarchy

### Step 13: Accessibility Improvements
- ✅ Added skip-to-main content links on all pages
- ✅ Implemented proper ARIA labels and roles (banner, main, contentinfo, navigation)
- ✅ Enhanced focus indicators with 3px outlines and box shadows
- ✅ Improved color contrast for better readability
- ✅ Added semantic HTML5 elements throughout
- ✅ Implemented proper form accessibility (aria-required, aria-describedby, role="alert")
- ✅ Added screen reader-only class for hidden but accessible content
- ✅ Improved alt text for gallery images (descriptive instead of generic)
- ✅ Added proper iframe accessibility (title and aria-label)
- ✅ Implemented high contrast mode support
- ✅ Added reduced motion support for accessibility preferences
- ✅ Enhanced keyboard navigation throughout
- ✅ Fixed skip-to-main link visibility (hidden by default, visible on focus)

---

## 🎨 Design Specifications

### Color Scheme

**Light Mode:**
- Primary Background: #ffffff
- Secondary Background: #f8f9fa
- Text Primary: #1a1a1a
- Text Secondary: #4a5568
- Accent Primary: #2d5016
- Accent Secondary: #4a7c2a
- Header Background: rgba(255, 255, 255, 0.90)
- CTA Section Background: rgba(255, 255, 255, 0.3)

**Dark Mode:**
- Primary Background: #0f172a
- Secondary Background: #1e293b
- Text Primary: #f1f5f9
- Text Secondary: #cbd5e1
- Accent Primary: #65a30d
- Accent Secondary: #84cc16
- Header Background: rgba(15, 23, 42, 0.90)
- CTA Section Background: rgba(15, 23, 42, 0.3)

### Typography
- Font Family: System fonts (San Francisco, Segoe UI, Roboto, etc.)
- Base Font Size: 16px
- Hero Title: 2.5rem (desktop), 1.5rem (mobile)
- Brand Name: 1.5rem (desktop), 1.25rem (mobile)
- Card Titles: 1.5rem

### Spacing
- XS: 0.5rem
- SM: 1rem
- MD: 1.5rem
- LG: 2rem
- XL: 3rem
- 2XL: 4rem

### Animations
- Hero text: Fade-up animation with staggered delays
- Theme toggle: Smooth icon transitions
- Carousel: Smooth image transitions (0.5s)
- Hover effects: Transform and shadow transitions

---

## 📱 Responsive Breakpoints

### Desktop (> 768px)
- Full navigation visible
- Three-column grid for cards
- Large hero text
- Full header with all elements

### Tablet (≤ 768px)
- Hamburger menu appears
- Single column for cards
- Reduced hero text size
- Brand name moves to top

### Mobile (≤ 480px)
- Compact header
- Smaller theme toggle
- Full-width buttons
- Optimized carousel controls

---

## 🔗 Navigation Flow

```
Home Page (index.html)
    │
    ├─→ Click Logo → Home (index.html)
    ├─→ Click "About Us" → #about (smooth scroll)
    ├─→ Click "Our Next Trips" → #ctaSection (smooth scroll)
    ├─→ Click Calendar Icon → #ctaSection (smooth scroll)
    ├─→ Click "View Upcoming Hikes" → #ctaSection (smooth scroll)
    └─→ Click "View Details" on "Join Next Event" card → middleFirst.html

Event Details Page (middleFirst.html)
    │
    ├─→ Click Logo → Home (index.html)
    ├─→ Click "Join This Event" button → middleSecond.html
    └─→ Navigation links → index.html sections

Registration Page (middleSecond.html)
    │
    ├─→ Click Logo → Home (index.html)
    ├─→ Fill form and submit → Success message
    └─→ Navigation links → index.html sections
```

---

## 🎯 Key Features

1. **Theme Toggle**
   - Smooth transition between light/dark modes
   - Saves preference to localStorage
   - Animated sun/moon icons

2. **Image Carousels**
   - Touch swipe (mobile)
   - Mouse drag (desktop)
   - Navigation arrows
   - Navigation dots
   - Keyboard navigation

3. **Video Background**
   - Autoplay, loop, muted
   - Quarter speed playback (0.25x)
   - Dark overlay for text readability
   - Fallback handling

4. **Smooth Scrolling**
   - Accounts for fixed header height
   - Smooth behavior for all anchor links

5. **Accessibility**
   - ARIA labels and roles
   - Keyboard navigation
   - Enhanced focus states (3px outlines)
   - Semantic HTML5
   - Skip-to-main content links
   - Screen reader support
   - High contrast mode support
   - Reduced motion support
   - Form accessibility (aria-required, aria-describedby)
   - WCAG 2.1 AA compliant

---

## 📂 File Structure

```
Project 2/
├── index.html          (Main landing page)
├── middleFirst.html    (Event details page)
├── middleSecond.html   (Registration form page)
├── confirmation.html   (Confirmation page - to be implemented)
├── bottom.html         (Additional page - to be implemented)
├── postFunnel.html     (Post-funnel page - to be implemented)
├── style.css           (All styles)
├── script.js           (All JavaScript)
├── wireframe page 1.md (This file - main wireframe)
├── wireframe page 2.md (Event details wireframe)
├── wireframe page 3.md (Event schedule wireframe)
├── wireframe page 4.md (Additional wireframe)
├── workflow.md         (Project planning)
├── README.md           (Project requirements)
└── assets/
    ├── logo.jpg
    ├── al_kafrein 1-21.jpg/jpeg
    ├── zoubia 1-21.jpg
    ├── sunset.png
    ├── king talal dam.jpg
    ├── king talal dam 3.jpg
    └── ... (other assets)
```

---

## ✅ Completed Features Checklist

- [x] Semantic HTML5 structure
- [x] Responsive design (desktop, tablet, mobile)
- [x] Sticky header with logo
- [x] Navigation links
- [x] Day/Night mode toggle
- [x] Calendar icon
- [x] Hamburger menu (mobile)
- [x] Brand name in header center
- [x] Background logo watermark
- [x] Hero section with auto-sliding images
- [x] Hero text with animations
- [x] CTA section with transparent background
- [x] Primary CTA button
- [x] Three CTA cards
- [x] Swipable image carousels (3 cards)
- [x] Navigation dots and arrows
- [x] Touch and mouse drag support
- [x] Footer with social links
- [x] Smooth scrolling
- [x] CSS variables for theming
- [x] All assets integrated
- [x] All navigation links connected
- [x] Event details page (middleFirst.html)
- [x] Registration form page (middleSecond.html)
- [x] Google Maps integration for meeting point
- [x] Event gallery with lightbox
- [x] Form validation and error handling
- [x] Accessibility improvements (WCAG 2.1 AA compliant)
- [x] Skip-to-main content links
- [x] Enhanced focus indicators
- [x] ARIA labels and roles
- [x] Keyboard navigation support

---

## 🚀 Future Enhancements (Optional)

- [ ] Add "About Us" page content
- [ ] Create individual trip detail pages
- [ ] Add registration form
- [ ] Implement contact form
- [ ] Add social media feed integration
- [ ] Add blog/news section
- [ ] Implement search functionality
- [ ] Add user testimonials
- [ ] Create gallery page
- [ ] Add booking system

---

## 📝 Notes

- All images are stored in the `assets/` folder
- Video is optimized for web playback
- Carousels support up to 21 images per card
- Theme preference is saved in browser localStorage
- All links use smooth scroll with header offset
- Website is fully accessible and keyboard navigable

---

**Last Updated:** Current Development Session  
**Status:** ✅ Core Features Complete - Event details and registration pages implemented with full accessibility support

## 📋 Recent Updates

### Session Updates:
1. **Created Event Details Page (middleFirst.html)**
   - Complete event information page with all details from wireframes
   - Auto-sliding hero images from Al Kafrein event
   - Event info grid, included/not included sections
   - Safety & rules, schedule timeline, what to bring checklist
   - Google Maps integration for meeting point
   - Event gallery with lightbox functionality
   - Single CTA button "Join This Event"

2. **Created Registration Page (middleSecond.html)**
   - Complete registration form with validation
   - Personal details, emergency contact, age group, medical condition
   - Form error handling and success messages
   - Accessible form implementation

3. **Comprehensive Accessibility Improvements**
   - WCAG 2.1 AA compliance
   - Skip-to-main content links (hidden by default, visible on focus)
   - Enhanced ARIA labels and roles
   - Improved focus indicators
   - Better color contrast
   - Keyboard navigation support
   - Screen reader optimization

4. **Fixed Issues**
   - Fixed skip-to-main link visibility (now properly hidden until focused)
   - Improved form accessibility
   - Enhanced image alt text

