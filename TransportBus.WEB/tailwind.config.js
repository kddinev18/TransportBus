/** @type {import('tailwindcss').Config} */
module.exports = {
  //prefix: 'tw-',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'text': '#05210f',         // Dark greenish-gray for readable text
      'primary': '#2596be',      // Deep teal-green for primary actions
      'secondary': '#246a80',    // Darker soft pastel green for secondary elements
      'accent': '#3d9c7a',       // Darker vibrant sea green for interactive or highlighted elements
      'error': '#ff6b6b',        // Soft red for errors or alerts
      'success': '#28b487',      // Gentle green for success indicators
      'info': '#56c29b',         // Bright greenish-aqua for informational highlights
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    "./node_modules/flowbite/**/*.js"
  ]
 }