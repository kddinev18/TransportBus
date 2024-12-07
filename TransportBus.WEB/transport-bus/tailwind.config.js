/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'text': '#05210f',         // Dark greenish-gray for readable text
      'background': '#f7fcfb',   // Very light mint green for a clean background
      'primary': '#2a7f5e',      // Deep teal-green for primary actions
      'secondary': '#cde8df',    // Soft pastel green for secondary elements
      'accent': '#47b38f',       // Vibrant sea green for interactive or highlighted elements
      'muted': '#eaf4f1',        // Very pale green for less prominent areas
      'error': '#ff6b6b',        // Soft red for errors or alerts
      'success': '#28b487',      // Gentle green for success indicators
      'info': '#56c29b',         // Bright greenish-aqua for informational highlights
      'highlight': '#f0fbf7',    // Pale mint green for background highlights
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
 }