# Valley's Adventure - Website Wireframe & Development Steps
## a prompt to chatGPT

give me a prompt to cursor that to act like a senior web developer with strong UI/UX skills.
Clean, professional, construction/interior-design style
Fully responsive (desktop, tablet, mobile)
Use semantic HTML5
Organized, readable code with comments .
Create a modern, responsive website about a web page the first page will have at the header a logo in the left side so I can click on the logo instead of the Home button next to about us and our next trips . At the right of the header put a toggle that have a moon in the right & sun in the left to switch between night/day mood (put the sun and the moon inside the button), and a little icon (calendar icon).
- I have the logo's image
- I want the name of the website be valley's adventure
then in the content section 
I want to put the logo in the background 

in the hero section I want to put a short video in the background *without sound
(
*Join organized hiking trips
*explore nature safely
*Meet Like-minded People
*All Levels Welcome
* Local Guides & Community
(in the hero))
Call To Action: 
View Upcoming Hikes  &  (Join Next Event I'll put a picture in the card) & I need to put a button that to view the details
like card (I'll link them later to another page)

in the footer copyrights(2024), instagram icon (I'll link it with our instagram account) whatsapp icon (the same thing) phone number (00962787426310)

## 📋 Project Overview

**Website Name:** Valley's Adventure  
**Type:** Outdoor & Adventure Hiking Trip Organization Website  
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
┌─────────────────────────────────────────────────────────────┐
│ [Logo]  About Us | Our Next Trips    [☀️/🌙] [📅] [☰]      │
│                                                               │
│                    Valleys Adventure                          │
└─────────────────────────────────────────────────────────────┘
```

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
│                                                               │
│                    [Background Video]                        │
│                    (Dark Overlay)                            │
│                                                               │
│              Join organized hiking trips                     │
│              Explore nature safely                            │
│              Meet like-minded people                          │
│              All levels welcome                              │
│              Local guides & community                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Full-width hero section
- Background video (autoplay, loop, muted, no controls)
- Video playback speed: 0.25x (quarter speed)
- Dark overlay for text readability (opacity: 0.15 light / 0.25 dark)
- Hero text with smooth fade-up animations
- White text with enhanced shadow for visibility

#### 3. CTA Section (Call To Action)
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              [View Upcoming Hikes Button]                    │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │                  │
│  │          │  │          │  │          │                  │
│  │ Join     │  │ Weekend  │  │ Sunset   │                  │
│  │ Next     │  │ Adventure│  │ Hikes    │                  │
│  │ Event    │  │          │  │          │                  │
│  │          │  │          │  │          │                  │
│  │ [View    │  │ [View    │  │ [View    │                  │
│  │ Details] │  │ Details] │  │ Details] │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Background: 70% transparent (30% opacity)
- Primary CTA button: "View Upcoming Hikes"
- Three secondary CTA cards with swipable image galleries

**Card 1: Join Next Event**
- 21 al_kafrein images (swipable carousel)
- Images: al_kafrein 1.jpg through al_kafrein 21.jpg

**Card 2: Weekend Adventure**
- 21 zoubia images (swipable carousel)
- Images: zoubia 1.jpg through zoubia 21.jpg

**Card 3: Sunset Hikes**
- 4 images (swipable carousel)
- Main image: sunset.png
- 3 king talal dam images

**Carousel Features:**
- Touch swipe support (mobile)
- Mouse drag support (desktop)
- Navigation arrows (prev/next)
- Navigation dots
- Smooth transitions
- Keyboard navigation (arrow keys)

#### 4. Footer
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Copyright © 2026 Valleys Adventure                          │
│                    [📷] [💬] 00962787426310                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
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
    └─→ Click "View Upcoming Hikes" → #ctaSection (smooth scroll)
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
   - ARIA labels
   - Keyboard navigation
   - Focus states
   - Semantic HTML

---

## 📂 File Structure

```
Project 2/
├── index.html          (Main page)
├── style.css           (All styles)
├── script.js           (All JavaScript)
├── wireframe.md        (This file)
├── workflow.md         (Project planning)
├── README.md           (Project requirements)
└── assets/
    ├── logo.jpg
    ├── logo without background.png
    ├── video for hero section.mp4
    ├── al_kafrein 1-21.jpg/jpeg
    ├── zoubia 1-21.jpg
    ├── sunset.png
    ├── king talal dam.jpg
    ├── king talal dam 2.jpg
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
- [x] Hero section with video
- [x] Hero text with animations
- [x] Video playback speed control
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
**Status:** ✅ Complete - All core features implemented

