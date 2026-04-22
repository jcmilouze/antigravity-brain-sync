# Addictive Prints Landing Page - Design Spec

**Date** : 2026-04-22  
**Project** : Addictive Prints - Reboot  
**Scope** : Premium landing page with high-tech 3D, e-commerce mock, and interactive experiences  
**Status** : Design Approved

---

## 1. Vision & Goals

**What** : Redesign addictiveprints.fr as a modern, premium landing page that showcases artisanal 3D-printed products with cutting-edge tech aesthetics.

**Who** : Artisans and demanding craftspeople (target from original site)

**Why** : 
- Current site is minimal but outdated
- Opportunity to leverage 3D/animations to tell the story: "Craftsmanship + Technology"
- E-commerce mockup shows purchase flow without backend complexity

**Success Criteria** :
- Stunning visual first impression (3D hero)
- Smooth, performant animations (Framer Motion + Three.js)
- Full e-commerce UX (browse → cart → checkout)
- Professional, cohesive design language
- Mobile responsive
- Page should feel "premium tech" not "busy"

---

## 2. Design Direction

### 2.1 Visual Identity

**Color Palette: Cyber-Luxe**
- **Primary** : Cyan (#00D4FF) — Innovation, tech-forward
- **Secondary** : Purple (#7C3AED) — Premium, sophisticated
- **Accent** : Magenta (#FF006E) — Energy, passion, artisanal touch
- **Highlight** : Amber (#FBB F24) — Warmth, craftsmanship
- **Background** : Dark (#1A1A2E) — Modern, high-contrast

**Typography** :
- Headings: Inter Bold / GeistMono (modern, tech)
- Body: Inter Regular (clean, readable)
- Size hierarchy: H1 (3.5rem) → H2 (2rem) → Body (1rem)

**Spacing & Layout** :
- Generous whitespace (modern premium feel)
- Max-width: 1400px (wide but contained)
- 16px base spacing unit (multiples of 8/16)

### 2.2 Component Style

**Cards & Containers** :
- Subtle glassmorphism: `rgba(255,255,255, 0.05)` background + border
- Border radius: 12-16px
- Hover states: border glow (cyan), lift effect (translateY -8px)
- Shadows: soft, color-tinted (cyan/purple glow)

**Buttons** :
- Primary: Cyan-to-Purple gradient
- Hover: scale 1.05, enhanced glow shadow
- Secondary: bordered, minimal

**Icons** :
- Lucide React (included in package.json)
- Size: 24px standard, 32px for prominence
- Color: inherit or cyan/magenta

---

## 3. Page Architecture

### 3.1 Layout Structure

```
Header (sticky)
├── Logo
├── Nav (Accueil, Catalogue, À Propos, Contact)
└── Cart Icon (badge)

Hero Section (100vh)
├── 3D Canvas (Three.js - Imprimante rotatif)
├── Text Overlay
│   ├── Tagline
│   ├── Description
│   └── CTA "Explorer la Magie"
└── Scroll Hint (animated chevrons)

Featured Products (3 cols)
├── Product 1 (3D preview on hover)
├── Product 2
└── Product 3

3D Configurateur
├── Product selector
├── Color picker (palette)
├── Material selector (PLA, PETG, Nylon)
├── 3D Model (center, updates in real-time)
└── "Ajouter au panier" CTA

Collections Explorer
├── Tabs (Ponçage, Aspiration, Essentiels)
├── Sidebar Filters (Matériau, Couleur, Prix)
└── Grid 4 cols (products with lazy-load animations)

Community & Testimonials
├── Carousel (UGC images + quotes)
└── Social links

Footer
├── Links
├── Newsletter signup
└── Social icons

Offcanvas Cart (right side, overlay)
├── Cart items list
├── Price breakdown
└── "Proceed to Checkout" CTA

Modal Checkout (overlay, centered)
├── Form (address, payment mockup)
├── Confirmation state
└── Close button
```

### 3.2 Sections Detail

#### Hero Section (100vh, Full 3D)
- **3D Element** : Three.js canvas showing 3D printer model
  - Auto-rotate on load
  - Mouse-tracking (follows cursor)
  - Responsive to window resize
- **Text Overlay** (centered, semi-transparent dark background)
  - H1: "Précision Addictive"
  - Subtitle: "Où l'artisanat rencontre la technologie"
  - CTA Button: "Explorer la Magie de la Précision"
- **Scroll Hint** : Animated chevrons (Framer Motion) at bottom
- **Gradient Overlay** : Dark gradient for text readability

#### Featured Products (3 Columns)
- Show 3 "best sellers" or featured items
- Card layout: image + 3D preview toggle + title + price + tags
- Hover behavior:
  - Image rotates to 3D (or 3D preview shows)
  - Description/price slide in
  - "Add to cart" button appears (with glow)
- Tags: "Best-seller", "Nouveau", "Trending" (position top-left)
- Animation: staggered fade-in on scroll

#### 3D Configurateur
- Product dropdown to select item
- Color picker: 5 circular swatches (Cyber-Luxe palette)
- Material selector: Radio buttons (PLA, PETG, Nylon) with descriptions
- 3D Model center: Updates color/material in real-time
- "En Situation" preview: Shows product being used (2D image or 3D scene)
- "Ajouter au panier" button (large, prominent)
- Animations: smooth color transitions, model rotation on select

#### Collections Explorer
- Tabs (3): "Ponçage", "Aspiration", "Essentiels"
- Sidebar filters (left): Matériau (dropdown), Couleur (checkboxes), Prix (range slider)
- Grid (4 cols on desktop, 2 on tablet, 1 on mobile)
- Products: image + title + price + rating stars
- Lazy-load animations: fade + translate on scroll
- Active filters: show as chips, click to remove

#### Community & Testimonials
- Carousel of UGC (user-generated content)
- Each slide: image + name + quote + rating
- Controls: dots/arrows (left/right)
- Auto-advance every 5s (pause on hover)
- Animation: smooth fade/slide transition

#### Shopping Flow (Cart & Checkout)
- **Cart Offcanvas** (right side, 400px wide, overlay)
  - Header: "Votre Panier" + close button
  - Items list: product image (thumbnail) + name + price + qty selector
  - Subtotal + estimated shipping
  - "Proceed to Checkout" button
  - Animation: slide in from right, fade overlay
  
- **Checkout Modal** (centered, 600px wide, overlay)
  - Header: "Finaliser votre commande"
  - Form sections:
    - Adresse (nom, email, adresse, code postal, ville)
    - Méthode de paiement (radio: Card, PayPal, Apple Pay — mockup only)
    - Order summary (recap of items)
  - "Confirmer la commande" button (large, gradient)
  - Confirmation state: success message + order number (mockup)
  - Animation: fade + scale in

---

## 4. Interactions & Animations

### 4.1 Framer Motion Animations

**Page Transitions** :
- Fade in on mount
- Staggered children (products, sections)

**Hero** :
- Text fade-in on scroll
- Scroll hint: infinite chevron animation (bounce up-down)

**Featured Products** :
- Staggered appearance (0.1s delay between each)
- Hover: image glow, card lift, CTA slide in
- Add-to-cart: bounce animation + toast notification

**3D Configurateur** :
- Color/material change: smooth transition (0.3s)
- Model rotation: responsive to selection

**Collections** :
- Filter changes: smooth fade between grids
- Products: fade + slideUp on scroll (intersection observer)

**Cart & Checkout** :
- Offcanvas slide + fade overlay
- Modal scale + fade
- Form validation: shake on error, slide-in error messages
- Confirmation: success animation (checkmark, confetti mockup)

### 4.2 Three.js Interactions

**Hero 3D Model** :
- Load GLTF/GLB model (or procedural geometry)
- Auto-rotate (Y-axis, continuous)
- Mouse-tracking: rotate based on cursor position
- Responsive canvas (resize listener)
- Lighting: key light (cyan) + fill light (purple)

**Configurateur 3D Model** :
- Same model or similar
- Update material/color when selected
- Slight rotation animation

**Featured Products (3D Previews)** :
- Optional 3D preview on hover (can be image or actual 3D)
- If 3D: small canvas or embedded preview

---

## 5. Data Structure & Mocking

### 5.1 Product Interface

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "ponçage" | "aspiration" | "essentiels";
  image: string; // image URL or path
  model3d?: string; // GLTF/GLB file path
  colors: Color[];
  materials: Material[];
  featured: boolean;
  rating: number; // 0-5
  reviewCount: number;
  tags?: string[]; // "Best-seller", "Nouveau", etc.
}

interface Color {
  name: string;
  hex: string; // e.g., "#00D4FF"
  label: string;
}

interface Material {
  id: string;
  name: string; // "PLA", "PETG", "Nylon"
  description: string;
  priceAddon?: number; // additional cost
}

interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  image?: string;
  date: string;
}
```

### 5.2 Mock Data

**Products** (~15 items) :
- 3 featured (best-sellers)
- 5 in "Ponçage" category
- 4 in "Aspiration" category
- 3 in "Essentiels" category
- Mock images: placeholder or simple product renders
- Mock 3D models: procedural shapes or simple GLB files

**Colors** :
- Cyber-Luxe palette (5 main colors)
- Plus 2-3 variations per product

**Materials** :
- PLA (standard, affordable)
- PETG (durable, slightly more expensive)
- Nylon (premium, most expensive)

**Reviews/UGC** :
- 5-10 mock testimonials with names + quotes
- Carousel images (same or different)

### 5.3 State Management

**Cart State** (Zustand) :
```typescript
interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
  selectedMaterial: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
}
```
- Persist to localStorage for UX

**UI State** :
- Cart offcanvas open/closed
- Checkout modal open/closed
- Active collection tab
- Active filters
- Loaded/loading state for collections

---

## 6. Component Breakdown

### 6.1 Core Components

```
app/
├── layout.tsx (root layout, header/footer)
├── page.tsx (home, orchestrates sections)
├── globals.css (Tailwind + custom CSS variables)
└── components/
    ├── Header.tsx (sticky nav + cart icon)
    ├── Hero3D.tsx (Three.js canvas + text overlay)
    ├── FeaturedProducts.tsx (3 cols featured)
    ├── Configurator3D.tsx (product selector + color/material + 3D)
    ├── CollectionsExplorer.tsx (tabs + filters + grid)
    ├── CommunityCarousel.tsx (UGC testimonials)
    ├── CartOffcanvas.tsx (side panel)
    ├── CheckoutModal.tsx (form + confirmation)
    ├── Footer.tsx (links, newsletter, social)
    ├── ProductCard.tsx (reusable)
    ├── ColorPicker.tsx (reusable)
    ├── MaterialSelector.tsx (reusable)
    └── (other smaller components as needed)
```

### 6.2 Hooks & Utilities

```
lib/
├── store.ts (Zustand cart store)
├── mockData.ts (products, reviews, colors, materials)
├── types.ts (TypeScript interfaces)
└── utils.ts (helper functions)
```

---

## 7. Technical Stack

**Frontend** :
- Next.js 16.2.4 (latest)
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12.38.0 (animations)
- Three.js 0.184.0 + @react-three/fiber + @react-three/drei (3D)
- Zustand (state management)
- Lucide React (icons)

**Styling** :
- Tailwind CSS with custom CSS variables for colors
- PostCSS 4

**No Backend** :
- All data mocked locally
- Cart in localStorage
- Checkout UI only (no real payment processing)

---

## 8. Responsive Design

**Breakpoints** :
- Mobile: < 640px (1 col, adjusted spacing)
- Tablet: 640px - 1024px (2 cols)
- Desktop: > 1024px (3-4 cols, full width)

**Key Adjustments** :
- Hero: text size smaller on mobile, 3D canvas may be optional/simplified
- Featured Products: stack vertically on mobile
- Collections grid: 1 col mobile, 2 col tablet, 4 col desktop
- Cart/Checkout: full-width modal on mobile
- Header: mobile menu (hamburger) on small screens

---

## 9. Performance Considerations

**Optimization** :
- Lazy-load 3D models (intersection observer)
- Image optimization (next/image)
- Code-split components (dynamic imports)
- Memoize expensive components (FeaturedProducts, Collections)
- Defer non-critical animations

**3D Performance** :
- Limit polygon count of models
- Use WebGL performance monitoring
- Disable auto-rotation when not in viewport

**Bundle Size** :
- Three.js is large (~200KB) but necessary
- Tree-shake unused Three utilities
- Monitor with `next build`

---

## 10. Testing & QA

**Manual Testing** :
- [ ] Hero 3D rotates smoothly, mouse-tracking works
- [ ] All animations play without jank (60fps target)
- [ ] Cart add/remove works, localStorage persists
- [ ] Checkout form validation
- [ ] Responsive on mobile/tablet/desktop
- [ ] Color/material selector updates 3D model
- [ ] Collections filters work (reset, apply, clear)
- [ ] Accessibility: keyboard nav, ARIA labels

**Browser Support** :
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## 11. Future Enhancements (Out of Scope)

- Real Stripe integration
- User accounts / login
- Real backend for orders
- Analytics / heatmaps
- Admin dashboard for products
- Customer reviews system
- Product variants (sizes, weights)
- Wishlist / favorites
- Email notifications

---

## 12. Design Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| Cyber-Luxe colors (cyan/purple/magenta) | Balances tech innovation with artisanal passion; high contrast for premium feel |
| Hybrid immersive layout | Combines storytelling (hero) with commerce efficiency (catalog) |
| Full 3D hero with mouse-tracking | Immediately signals "high-tech" and captures attention |
| Zustand for cart state | Lightweight, simple, perfect for small state tree (no overkill like Redux) |
| Mock data + localStorage | Simplifies scope, focuses on UX without backend complexity |
| Framer Motion for animations | Declarative, performant, integrates seamlessly with React 19 |
| Three.js for 3D | Industry standard, powerful, great Next.js integration via @react-three/fiber |

---

## 13. Success Metrics

- ✅ Page loads in < 2s (Lighthouse score > 80)
- ✅ Animations run at 60fps (no drops)
- ✅ Full e-commerce UX mockup (browse → cart → checkout)
- ✅ Mobile responsive and accessible
- ✅ Design cohesion (Cyber-Luxe colors applied throughout)
- ✅ 3D hero as centerpiece (impressive first impression)

---

**Status** : Ready for implementation ✅
