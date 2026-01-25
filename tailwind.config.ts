import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#8b5cf6',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
