/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        body: "#F5F5F5",
        primary: "#43c6ac",
        secondary: "#4568dc",
        graytagp: "#737373",
        taghot: "#D7253B",
        tagnew: "#FFD839",
      },
    },
  },
  plugins: [],
};
