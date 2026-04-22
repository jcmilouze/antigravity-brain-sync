// Color palette (Stitch Design System)
export const STITCH_COLORS = {
  primary: '#becbb1',
  primaryContainer: '#88957d',
  background: '#131313',
  surfaceContainer: '#1f1f1f',
  surfaceContainerHigh: '#2a2a2a',
  surfaceContainerHighest: '#353535',
  onSurface: '#e2e2e2',
  onSurfaceVariant: '#c5c7be',
  outline: '#8f9289',
  outlineVariant: '#454840',
  tertiary: '#c2c9bc',
  inversePrimary: '#56624d',
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

// Typography (Stitch Design System)
export const TYPOGRAPHY = {
  h1: { size: '3.5rem', weight: 700, fontFamily: "'Manrope', sans-serif" },
  h2: { size: '2rem', weight: 600, fontFamily: "'Manrope', sans-serif" },
  h3: { size: '1.5rem', weight: 600, fontFamily: "'Manrope', sans-serif" },
  body: { size: '1rem', weight: 400, fontFamily: "'Inter', sans-serif" },
  small: { size: '0.875rem', weight: 400, fontFamily: "'Inter', sans-serif" },
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
