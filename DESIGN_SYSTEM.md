# Echelon Design System

## 🎨 Design Philosophy

Premium white aesthetic with subtle animations, smooth transitions, and attention to detail. Every interaction feels polished and intentional.

## ✨ Key Design Features

### 1. **Enhanced Product Cards**
- Smooth scale-up hover effect (110% zoom on images)
- Gradient overlay on hover
- "Quick View" badge that slides in
- Circular arrow button with scale animation
- Price with "Cash on Delivery" subtitle
- Lift effect on hover (-translate-y-1)
- Enhanced shadow transitions

### 2. **Improved Homepage**
- **Hero Section**
  - Decorative blur circles for depth
  - Animated stats (Products, Quality, COD)
  - Staggered fade-in animations
  - Gradient background
  
- **Product Grid**
  - Staggered animations (0.1s-0.6s delays)
  - "Our Collection" section header
  - Enhanced empty state with gradient icon
  
- **Features Section**
  - Three feature cards with icons
  - White cards on gray background
  - Smooth fade-in animations

### 3. **Premium Header**
- Glass effect (backdrop-blur)
- Logo with icon in rounded square
- Animated cart icon (hover changes to black)
- Underline animation on links
- Sticky positioning

### 4. **Animation System**
```css
- fadeIn: Fade + slide up (0.6s)
- slideIn: Fade + slide from left (0.5s)
- scaleIn: Fade + scale up (0.4s)
- Stagger delays: 0.1s - 0.6s
```

### 5. **Component Enhancements**

#### Buttons
- Scale up on hover (105%)
- Scale down on click (95%)
- Enhanced shadows
- Smooth 300ms transitions

#### Cards
- Lift on hover
- Shadow transitions (sm → 2xl)
- 500ms duration
- Subtle translate-y effect

#### Inputs
- Border color transitions
- Ring effect on focus
- Hover state (border-gray-300)

### 6. **Custom Utilities**

```css
.gradient-bg - Subtle gradient background
.gradient-text - Gradient text effect
.glass-effect - Frosted glass appearance
.spinner - Loading animation
.status-badge - Colored status pills
.image-hover-zoom - Image zoom effect
```

### 7. **Scrollbar Styling**
- Custom width (10px)
- Rounded thumb
- Gray color scheme
- Hover effects

## 🎯 Color Palette

### Primary Colors
- **Black**: #111827 (gray-900) - Primary actions
- **White**: #FFFFFF - Background
- **Gray-50**: #F9FAFB - Subtle backgrounds
- **Gray-100**: #F3F4F6 - Borders, dividers
- **Gray-600**: #4B5563 - Secondary text
- **Gray-900**: #111827 - Primary text

### Functional Colors
- **Success**: Green-600
- **Warning**: Yellow-500
- **Error**: Red-500
- **Info**: Blue-500

## 📐 Spacing Scale

- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## 🔤 Typography

### Font Family
- **Primary**: Geist Sans (Variable)
- **Mono**: Geist Mono (Variable)

### Font Weights
- **Light**: 300 - Headlines, prices
- **Regular**: 400 - Body text
- **Medium**: 500 - Buttons, labels
- **Bold**: 700 - Emphasis (rarely used)

### Font Sizes
- **Hero**: 3.5rem - 4.5rem (56px - 72px)
- **H1**: 2.25rem - 3rem (36px - 48px)
- **H2**: 1.875rem (30px)
- **H3**: 1.5rem (24px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)
- **Tiny**: 0.75rem (12px)

## 🎭 Animations

### Timing Functions
- **ease-out**: Default for most animations
- **ease-in-out**: For reversible animations
- **linear**: For spinners

### Durations
- **Fast**: 200ms - Color changes
- **Medium**: 300ms - Buttons, links
- **Slow**: 500ms - Cards, major transitions
- **Very Slow**: 700ms - Image zooms

### Animation Patterns
1. **Stagger**: Sequential animations with delays
2. **Fade In**: Opacity 0 → 1 with slide up
3. **Scale**: Transform scale 0.9 → 1
4. **Slide**: Transform translateX/Y

## 🖼️ Image Guidelines

### Aspect Ratios
- **Product Cards**: 1:1 (Square)
- **Hero Images**: 16:9
- **Thumbnails**: 1:1

### Hover Effects
- **Zoom**: 110% scale
- **Duration**: 700ms
- **Overlay**: Black gradient (20% opacity)

## 📱 Responsive Breakpoints

```css
sm: 640px   - Mobile landscape
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
2xl: 1536px - Extra large
```

## 🎨 Component Patterns

### Card Pattern
```tsx
<div className="premium-card">
  <div className="image-hover-zoom">
    <img />
  </div>
  <div className="p-6">
    {/* Content */}
  </div>
</div>
```

### Button Pattern
```tsx
<button className="premium-button">
  Action
</button>

<button className="premium-button-outline">
  Secondary
</button>
```

### Input Pattern
```tsx
<input className="premium-input" />
```

## ✨ Micro-interactions

1. **Button Click**: Scale down (95%)
2. **Card Hover**: Lift + shadow
3. **Link Hover**: Underline animation
4. **Image Hover**: Zoom + overlay
5. **Icon Hover**: Scale up (110%)

## 🎯 Best Practices

### DO:
✅ Use light font weights for elegance
✅ Add subtle animations
✅ Maintain consistent spacing
✅ Use rounded corners (xl, 2xl)
✅ Keep shadows subtle
✅ Use glass effects sparingly

### DON'T:
❌ Overuse bold fonts
❌ Add too many animations
❌ Use harsh shadows
❌ Mix too many colors
❌ Ignore loading states
❌ Forget hover states

## 🚀 Performance

- Animations use `transform` and `opacity` (GPU accelerated)
- Smooth scroll enabled
- Backdrop blur for glass effect
- Optimized transition durations
- Lazy loading for images

## 📦 Component Library

### Available Components
- ProductCard
- Header (with glass effect)
- Footer
- Premium buttons
- Premium inputs
- Status badges
- Loading spinner
- Empty states

### Utility Classes
- `.premium-card`
- `.premium-button`
- `.premium-button-outline`
- `.premium-input`
- `.gradient-bg`
- `.glass-effect`
- `.spinner`
- `.animate-fade-in`
- `.stagger-1` through `.stagger-6`

---

**Design System Version**: 1.0
**Last Updated**: 2026
**Maintained by**: Echelon Team
