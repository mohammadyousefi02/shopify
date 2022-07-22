/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#EE384E',
        secondary: '#56B261',
        gray: '#89878B'
      },
    },
  },
  plugins: [],
  important: true
}
