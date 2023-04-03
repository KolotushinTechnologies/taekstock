/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgb(0, 223, 255)',
      }
    },
  },
  plugins: [],
}

