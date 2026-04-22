import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#becbb1',
        'primary-container': '#88957d',
        background: '#131313',
        'surface-container': '#1f1f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353535',
        'on-surface': '#e2e2e2',
        'on-surface-variant': '#c5c7be',
        outline: '#8f9289',
        'outline-variant': '#454840',
        tertiary: '#c2c9bc',
        'inverse-primary': '#56624d',
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
