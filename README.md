# POC International Organizational Consulting Website

## Project Overview

Build a static marketing website for POC International, an organizational consulting firm. The site should be fully responsive, multilingual (English/French), and include 8 main pages with custom hero sections, service pages, and integrated analytics.

---

## Technical Requirements

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES5/ES6)
- **Libraries**: jQuery 3.5.1, Owl Carousel, Video.js, Font Awesome
- **No Build System**: Static files only, no bundlers or frameworks
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge) and mobile devices

### Project Structure
```
/
├── index.html                          # Homepage
├── about-us.html                       # Our Story page
├── organizational-transformation.html  # Service page
├── employee-engagement.html            # Service page
├── performance-optimization.html       # Service page
├── leadership-professional-development.html # Service page
├── customer-experience.html            # Service page
├── data-management-insights.html       # Service page
├── css/                                # Stylesheets
├── js/                                 # JavaScript files
├── images/                             # Image assets
├── fonts/                              # Web fonts
├── media/                              # Video files
├── i18n/                               # Translation files
│   ├── en.json
│   └── fr.json
```

---

## Page Specifications

### 1. Homepage (index.html)

**Hero Section:**
- Full-width hero with video background (120vh height, 110vh on mobile)
- Video: `media/home-page-video-bkgrd-desktop.mp4` (autoplay, muted, loop)
- Fallback image: `images/BMT_Header_567x677.jpg` for mobile
- Hero text (centered, white): "From where you stand to where you strive<br><br>We make the journey possible."
- Text positioned with transform: translateY(-150px) on desktop

**Feature Boxes Section:**
- Three horizontal boxes below hero:
  1. "Optimize performance." (links to workforce planning)
  2. "Maximize potential." (links to talent acquisition)
  3. "Deliver Results." (links to briefings magazine)
- Each box: blue background texture, white text, hover effects
- Responsive: stack vertically on mobile with proper spacing
- Use Owl Carousel for desktop, flexbox for mobile

**Content Sections:**
- Featured Insights section with article cards
- Business challenge search section
- Contact form section (Marketo integration)
- Footer with navigation links, social media icons, copyright

**Header:**
- Transparent header with logo
- Navigation menu
- Language selector (EN/FR) - white by default, blue when header is white
- Search icon (blue color)
- Dynamic header that turns white on scroll

---

### 2. Our Story Page (about-us.html)

**Hero Section:**
- Background image: `images/Our Story.jpeg`
- Background size: cover, centered
- Background color: #00072D (dark blue)
- Height: 60vh (50vh mobile)
- Dark overlay: 50% opacity (rgba(0, 0, 0, 0.5))
- Heading: "Our Story" (white, centered vertically and horizontally)
- Hide video and mobile background elements

**Content:**
- Company narrative sections
- Responsive text content
- Footer

---

### 3. Service Pages (6 pages with identical structure)

Each service page should have:

**Hero Section:**
- Full-width hero (100% width, 60vh height, 50vh mobile)
- Custom background image matching page name:
  - `organizational-transformation.html` → `images/organizational transformation.png`
  - `employee-engagement.html` → `images/employeee engagement.png`
  - `performance-optimization.html` → `images/performance optimazation.png`
  - `leadership-professional-development.html` → `images/Leadership and Personal Development.png`
  - `customer-experience.html` → `images/customer experience.png`
  - `data-management-insights.html` → `images/Data Management.png`
- Background properties: `contain`, `center`, `no-repeat`
- Background color: #00072D
- Dark overlay: 50% opacity
- Page title as H1 (white, centered, vertically centered)
- Hide video and mobile background

**Content Section:**
- Text content about the service
- Responsive layout
- No duplicate headings in body (heading only in hero)

---

## Design Requirements

### Color Scheme
- Primary Blue: #1E6BD6
- Dark Blue Background: #00072D
- White: #ffffff
- Dark Gray: #1B1F23
- Text colors: White on dark backgrounds, Blue on white backgrounds

### Typography
- Headings: Large, bold, responsive sizing
- Body text: Readable, appropriate line-height
- Font families: Gotham, Roboto Slab (web fonts)
- Font Awesome icons for UI elements

### Responsive Breakpoints
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: 480px - 768px
- Small Mobile: < 480px

### Hero Section Standards
- All hero sections: Full width, minimum 60vh height
- Background images: Cover or contain based on design
- Text: White, centered (vertically and horizontally)
- Overlay: 40-60% dark overlay for readability
- Responsive: Adjust height on mobile (50vh)

---

## Key Features to Implement

### 1. Internationalization (i18n)
- Language selector in header (EN/FR)
- Translation system using JSON files
- `data-i18n` attributes on translatable elements
- Language selector:
  - White by default (when header is transparent)
  - Blue (#1E6BD6) when header background is white
  - Smooth color transitions
  - Dropdown menu with language options

### 2. Header System
- Transparent header on hero sections
- White header on scroll (add `.white` or `.scrolled` class)
- Dynamic color changes:
  - Navigation links: White → Blue when header is white
  - Language selector: White → Blue when header is white
  - Search icon: Always blue
- Logo in header
- Mobile-responsive navigation

### 3. Search Functionality
- Search icon: Blue color (#1E6BD6)
- Search input field
- Search functionality (integrate with Cludo or similar)
- Mobile-friendly search interface

### 4. Responsive Design
- Mobile-first approach
- Flexible layouts (flexbox/grid)
- Responsive typography (scales appropriately)
- Touch-friendly interactions
- Proper spacing on all devices
- Images scale properly (max-width: 100%)

### 5. Analytics Integration
- Adobe Analytics (Launch) integration
- Marketo form tracking
- Digital data layer for tracking
- Event tracking setup

---

## Specific Implementation Details

### Language Selector
```css
/* Default: White */
.language-selector-btn {
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* When header is white: Blue */
.header.white .language-selector-btn {
  color: #1E6BD6;
  border-color: rgba(30, 107, 214, 0.3);
}
```

### Hero Section CSS Pattern
```css
.hero_bg {
  background-image: url(images/[page-name].png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #00072D;
  min-height: 60vh;
  height: 60vh;
  position: relative;
}

.hero_bg:before {
  content: '';
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-text {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
}
```

### Mobile Responsive CSS
```css
@media (max-width: 768px) {
  .hero_bg {
    min-height: 50vh;
    height: 50vh;
  }
  .hero-text h1 {
    font-size: 32px;
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .hero-text h1 {
    font-size: 24px;
  }
}
```

---

## Content Requirements

### Homepage Content
- Hero tagline: "From where you stand to where you strive - We make the journey possible"
- Three feature boxes with descriptions
- Featured Insights section with article cards
- Business challenge search section
- Company boilerplate text
- Contact form

### Service Pages Content
Each service page should include:
- Hero with page title
- Introduction paragraph about the service
- Key benefits/features
- Call-to-action elements
- Related content links

### Translation Files
Create JSON files with translations:
- `i18n/en.json` - English translations
- `i18n/fr.json` - French translations
- Include translations for: navigation, hero text, features, content, footer

---

## JavaScript Requirements

### Language Selector Functionality
- Toggle dropdown on click
- Change language on selection
- Update all `data-i18n` elements
- Persist language choice (localStorage)
- Smooth transitions (prevent flickering)

### Header State Management
- Detect scroll position
- Add/remove classes for header state
- Update colors dynamically
- Use MutationObserver for class changes
- Smooth transitions

### Form Handling
- Marketo form integration
- Form validation
- Success/error handling
- Analytics tracking

---

## Assets Required

### Images
- Hero backgrounds (6 service pages + Our Story)
- Logo files
- Feature box backgrounds
- Article card images
- Icon graphics

### Fonts
- Gotham (Bold, Light)
- Roboto Slab (multiple weights)
- Font Awesome icons

### Media
- Hero video background (MP4)
- Video subtitles (VTT files for multiple languages)

---

## Performance Requirements

- Optimize images (appropriate formats, sizes)
- Minify CSS/JS where possible
- Lazy load images where appropriate
- Efficient CSS (avoid redundancy)
- Fast page load times

---

## Accessibility Requirements

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus states for interactive elements

---

## Deliverables

1. 8 complete HTML pages (fully functional)
2. CSS files (organized, responsive)
3. JavaScript files (functional, commented)
4. Image assets (optimized)
5. Translation files (en.json, fr.json)
6. Font files
7. Video assets
8. Documentation (if needed)

---

## Success Criteria

- All pages render correctly on desktop, tablet, and mobile
- Language switching works smoothly
- Header color changes work correctly
- All hero sections display properly with backgrounds
- Search functionality works
- Forms integrate with Marketo
- Analytics tracking is functional
- Site is accessible and performant
- Code is clean and maintainable

---

## Development Setup

### Running Locally

1. Clone the repository
2. Navigate to the project directory
3. Start a local HTTP server:
   ```bash
   python3 -m http.server 1000
   ```
4. Open browser to `http://localhost:1000`

### File Structure
- All HTML pages in root directory
- CSS files in `/css/` directory
- JavaScript files in `/js/` directory
- Images in `/images/` directory
- Fonts in `/fonts/` directory
- Media files in `/media/` directory
- Translation files in `/i18n/` directory

---

## Notes

- This is a static website with no build process
- All pages are manually maintained
- Python utility scripts available for bulk updates
- Git is used for version control
- Site is designed to be hosted on static hosting services

---

## License

Copyright © POC International. All rights reserved.

