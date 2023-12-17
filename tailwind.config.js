/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
    
  ],
  darkMode: "class",
  theme: {
    colors: {
      maroon: '#6A0A2D',
      white: "#FFF",
      black: "#000",
      gray: '#A3A3A3',
      active: '#D4BDC5',
      hover: '#45061d',
      dark: '#131314',
      darkcard: '#2f2e33',
      darkside: '#262526',
      light: "#f8f9fa"
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

