---
name: Verdant Table
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#414844'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#4c6452'
  on-secondary: '#ffffff'
  secondary-container: '#cce6d0'
  on-secondary-container: '#506856'
  tertiary: '#002d1c'
  on-tertiary: '#ffffff'
  tertiary-container: '#00452d'
  on-tertiary-container: '#64b68e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#cee9d3'
  secondary-fixed-dim: '#b3cdb7'
  on-secondary-fixed: '#092012'
  on-secondary-fixed-variant: '#354c3b'
  tertiary-fixed: '#a0f4c8'
  tertiary-fixed-dim: '#85d7ad'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  price-display:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 16px
  gutter-grid: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is built for a fast-casual dining experience that emphasizes freshness, speed, and quality. The brand personality is **Fresh, Efficient, and Appetizing**, bridging the gap between high-end culinary standards and the speed of modern mobile ordering.

The visual style follows a **Modern Minimalism** approach with a high-contrast focus on food photography. By utilizing a "clean-plate" aesthetic—white backgrounds and crisp forest green accents—the UI recedes to let the vibrant colors of the ingredients take center stage. The interface evokes a sense of cleanliness and reliability, ensuring users feel confident in the quality of the food and the efficiency of the service.

## Colors

The palette is anchored by **Forest Green (#1B4332)**, representing growth, freshness, and high-quality organic produce. This color is reserved for primary actions, active navigation states, and branding elements.

- **Primary:** Forest Green is used for CTA buttons, toggle switches (active), and price points to signify value and action.
- **Surface:** A pure White (#FFFFFF) background is mandatory to maintain the "clean-plate" aesthetic and ensure food imagery "pops."
- **Secondary/Soft Accents:** A pale mint (#D8F3DC) is used for subtle backgrounds, such as selected category chips or light alerts, to provide a softer alternative to the high-contrast primary green.
- **Neutral:** Light grays (#F8F9FA) are used for secondary button backgrounds and input fields to keep the UI unobtrusive.

## Typography

This design system utilizes **Inter** exclusively for its exceptional legibility and systematic feel. The type hierarchy is designed for rapid scanning on mobile devices.

- **Headlines:** Use Bold weights with tight letter spacing for a punchy, modern look. 
- **Body:** Regular weight with generous line height for ingredient lists and descriptions to ensure readability against white backgrounds.
- **Price Treatment:** All prices must be formatted with the currency code "ETB" following the numeric value (e.g., 250 ETB). Prices should always use the `price-display` or `headline-md` styles to ensure they are the second most visible element after the product title.
- **Mobile Optimization:** Large headlines scale down for mobile to prevent awkward text wrapping on menu items.

## Layout & Spacing

The layout is built on a **4px baseline grid** to ensure mathematical harmony. 

- **Mobile First:** The primary layout for menu items is a **2-column fluid grid**. On mobile devices, use 16px side margins with a 12px gutter between the two columns.
- **Desktop:** The 2-column grid can expand to 4 columns while maintaining a max-width container of 1200px.
- **Rhythm:** Use 16px (stack-md) for vertical spacing between different menu categories and 24px (stack-lg) to separate major sections like "Popular Items" from the rest of the menu.

## Elevation & Depth

This design system uses a **Low-contrast Outline** and **Tonal Layering** approach instead of heavy shadows to maintain a clean, flat aesthetic.

- **Cards:** Product cards use a subtle 1px border (#E9ECEF) with no shadow. This keeps the interface feeling "light" and airy.
- **Overlays:** Full-screen overlays for checkout use a slight 10% black backdrop tint to focus attention on the transaction. 
- **Sticky Elements:** The bottom action bar (the "View Cart" bar) uses a subtle ambient shadow (0px 4px 20px rgba(0,0,0,0.08)) to indicate it sits above the scrolling menu content.

## Shapes

The shape language is **Rounded**, conveying a friendly and modern tone. 

- **Cards & Inputs:** Standard elements use a 0.5rem (8px) radius.
- **Buttons:** Primary action buttons use 0.5rem to maintain a professional look, while secondary "Add" buttons inside item cards may use 0.5rem for consistency.
- **Category Chips:** Use the `rounded-xl` (1.5rem / 24px) setting to create a pill-shaped appearance that distinguishes them from clickable item cards.
- **Images:** Food photography in the 2-column grid must be strictly square (1:1 aspect ratio) with a 0.5rem corner radius.

## Components

- **Category Chips:** Horizontal scrolling list of pill-shaped buttons. Active state: Forest Green background with White text. Inactive state: Neutral (#F8F9FA) background with Text (#081C15).
- **Item Cards:** 2-column grid cards. Top element: Square image. Middle: Item name (Headline-md) and brief description (Body-sm). Bottom: Price in ETB and a Forest Green "Plus" icon or "Add" button.
- **Sticky Action Bar:** Always visible at the bottom of the screen when items are in the cart. High-contrast Forest Green background, White text. Displays "View Cart", item count, and total price (ETB).
- **Checkboxes & Radios:** Forest Green fills for active states. Use a 2px stroke for inactive states to ensure visibility.
- **Overlays:** Slide-up panels for payment instructions. Header should be clear and persistent, with a "Close" icon in the top right.
- **Input Fields:** Minimalist design with a 1px border. Focus state: 2px Forest Green border.