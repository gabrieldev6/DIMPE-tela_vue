/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkmode: 'class', //selector, class
  theme: {
    screens: {
      'sm':'640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '4xl': '2370px'
    },
    export: {
      backgroundImage: {
        'showIlustrative': "url('src/assets/imgLogin.jpg')"
      }
    },
    
    extend: {},
  },
  plugins: [],
}
