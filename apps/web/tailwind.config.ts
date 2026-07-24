import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1120',
        'ink-raised': '#111A2E',
        paper: '#F5F6F0',
        brass: '#C9A45C',
        'brass-dim': '#8A713F',
        slate: '#4C6B70',
        moss: '#4E9A6A',
        clay: '#D96C5A',
        line: 'rgba(245, 246, 240, 0.10)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};

export default config;
