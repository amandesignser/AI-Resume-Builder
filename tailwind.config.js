/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'SF Pro Text', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15,23,42,0.18)',
      },
    },
  },
  plugins: [],
};

