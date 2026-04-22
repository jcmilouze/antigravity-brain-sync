import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-primary': '#00D4FF',
        'cyber-secondary': '#7C3AED',
        'cyber-accent': '#FF006E',
        'cyber-highlight': '#FBBF24',
        'cyber-background': '#1A1A2E',
        'cyber-surface': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['GeistMono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
