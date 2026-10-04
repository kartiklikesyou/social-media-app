/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#1d2421',
        moss: '#3d5948',
        cream: '#f7f7f4',
      },
    },
  },
  plugins: [],
};