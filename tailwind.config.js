const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["VT323", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#3060A5",
      },
    },
  },
  plugins: [],
};
