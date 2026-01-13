# Light/Dark Mode Toggle - Implementation Guide

## Overview

This document explains the light/dark mode toggle implementation. The toggle allows users to switch between light and dark themes, with the preference saved in localStorage and applied before page rendering to prevent flash.

## How It Works

### 1. CSS Variables System

**Location:** `style.css`

The implementation uses CSS custom properties (variables) for theming:

```css
:root {
    /* Light Mode (Default) */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #1a1a1a;
    --text-secondary: #4a5568;
    --accent: #10b981;
    --accent-hover: #059669;
}

.dark-mode {
    /* Dark Mode Overrides */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --accent: #10b981;
    --accent-hover: #059669;
}
```

- **Light mode** is the default (defined in `:root`)
- **Dark mode** overrides variables when `.dark-mode` class is present on `document.documentElement`
- All styles use `var(--variable-name)` to reference these values

### 2. JavaScript Functionality

**Location:** `script.js`

The JavaScript handles three main tasks:

1. **Early Theme Application** (inline script in `<head>`)
   - Runs before page renders to prevent flash
   - Reads from localStorage and applies theme immediately

2. **Theme Toggle Function**
   - Toggles `.dark-mode` class on `document.documentElement`
   - Saves preference to localStorage
   - Updates button accessibility attributes

3. **Event Listener Setup**
   - Uses event delegation on `document` for reliability
   - Prevents duplicate listeners with initialization flag
   - Supports both click and keyboard (Enter/Space) interactions

### 3. HTML Toggle Button

**Location:** All HTML pages (header/navigation)

```html
<button 
    id="themeToggle"
    class="theme-toggle-btn"
    type="button"
    aria-label="Switch to dark mode"
    aria-pressed="false"
    title="Toggle dark mode"
>
    <span class="theme-toggle-icon sun">🌞</span>
    <span class="theme-toggle-icon moon">🌙</span>
</button>
```

- Uses emoji icons (🌞 for light, 🌙 for dark)
- Fully accessible with ARIA attributes
- Styled with CSS transitions for smooth animations

## Key Features

✅ **Single Source of Truth**: `.dark-mode` class on `document.documentElement`  
✅ **No Flash**: Theme applied before page renders  
✅ **Persistent**: Preference saved in localStorage  
✅ **Reliable**: Works on every click, no page refresh needed  
✅ **Accessible**: ARIA labels and keyboard support  
✅ **Cross-Page**: Works on all pages with shared JavaScript  
✅ **No Duplicates**: Initialization flag prevents duplicate listeners  

## How to Reuse on Other Projects

### Step 1: Add CSS Variables

Copy the CSS variable system from `style.css`:

```css
:root {
    /* Light Mode (Default) - customize colors */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #1a1a1a;
    /* Add more variables as needed */
}

.dark-mode {
    /* Dark Mode Overrides */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f1f5f9;
    /* Override all variables */
}
```

### Step 2: Add Toggle Button HTML

Place the toggle button in your navigation/header:

```html
<button 
    id="themeToggle"
    class="theme-toggle-btn"
    type="button"
    aria-label="Switch to dark mode"
    aria-pressed="false"
>
    <span class="theme-toggle-icon sun">🌞</span>
    <span class="theme-toggle-icon moon">🌙</span>
</button>
```

### Step 3: Add Early Theme Script

Add this inline script in the `<head>` section (before closing `</head>`):

```html
<script>
    // Apply theme BEFORE page renders to prevent flash
    (function() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    })();
</script>
```

### Step 4: Copy JavaScript Functions

Copy these functions from `script.js`:

- `toggleTheme()` - Handles theme switching
- `updateThemeToggleButton()` - Updates button state
- `initThemeToggle()` - Initializes the toggle

Make sure to call `initThemeToggle()` on page load.

### Step 5: Style the Toggle Button

Copy the `.theme-toggle-btn` and `.theme-toggle-icon` styles from `style.css`, or customize them to match your design.

## FAQ Functionality

The FAQ accordion has been updated to:
- Hide answers by default (max-height: 0)
- Show answers when clicking the '+' button
- Smooth transitions using CSS
- Single-open behavior (one FAQ open at a time)

## Customization

### Change Default Theme

In the inline script, change the default from `'light'` to `'dark'`:

```javascript
const savedTheme = localStorage.getItem('theme') || 'dark'; // Changed from 'light'
```

### Use Different Icons

Replace the emoji icons with SVG icons or icon fonts:

```html
<span class="theme-toggle-icon sun">
    <svg>...</svg> <!-- Your sun icon -->
</span>
```

### Customize Colors

Simply update the CSS variables in `:root` and `.dark-mode` to match your brand colors.

## Browser Support

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- localStorage support required (all modern browsers)
- CSS Custom Properties support required (all modern browsers)

## Troubleshooting

**Theme not applying on page load?**
- Make sure the inline script is in `<head>` before `</head>`
- Check browser console for JavaScript errors

**Toggle not working?**
- Ensure `initThemeToggle()` is called on page load
- Check that the button has `id="themeToggle"`
- Verify JavaScript file is loaded

**Flash of wrong theme?**
- Ensure inline script runs before body content
- Check that script is synchronous (no `async` or `defer`)
