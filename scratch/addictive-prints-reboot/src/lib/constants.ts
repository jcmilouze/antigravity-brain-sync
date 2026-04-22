// Color palette
export const COLORS = {
  primary: '#00D4FF',      // Cyan
  secondary: '#7C3AED',    // Purple
  accent: '#FF006E',       // Magenta
  highlight: '#FBBF24',    // Amber
  background: '#1A1A2E',   // Dark
  surface: 'rgba(255,255,255, 0.05)',
  text: '#FFFFFF',
  textMuted: '#A0A0B0',
} as const;

// Size units
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '60px',
} as const;

// Breakpoints (Tailwind)
export const BREAKPOINTS = {
  sm: '640px',
  md: '1024px',
  lg: '1280px',
} as const;

// Typography
export const TYPOGRAPHY = {
  h1: { size: '3.5rem', weight: 700 },
  h2: { size: '2rem', weight: 600 },
  h3: { size: '1.5rem', weight: 600 },
  body: { size: '1rem', weight: 400 },
  small: { size: '0.875rem', weight: 400 },
} as const;

// Animation durations (ms)
export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Product categories
export const CATEGORIES = ['ponçage', 'aspiration', 'essentiels'] as const;

// Materials
export const MATERIALS = [
  { id: 'pla', name: 'PLA', description: 'Standard, affordable', priceAddon: 0 },
  { id: 'petg', name: 'PETG', description: 'Durable, slightly more expensive', priceAddon: 5 },
  { id: 'nylon', name: 'Nylon', description: 'Premium, most expensive', priceAddon: 15 },
] as const;
