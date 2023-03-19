/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
      },

      colors: {
        primary: "#181920",
        secondary: "#28313E",
        tertiary: "#BE60FD",
        active: "#246BFD",
        light: "#FBF5FB",
        gray: "#6B6A82",
      },
    },
  },
  plugins: [],
};
