/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-primary': '#fffcf2',
        'light-secondary': '#ccc5b9',
        primary: '#eb5e28',
        'dark-primary': '#252422',
        'dark-secondary': '#403d39',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
