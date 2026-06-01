// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const { heroui } = require('@heroui/react');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Noto Sans TC', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
