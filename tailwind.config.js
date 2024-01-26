/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightYellow: "#fed93f",
        lightBlue: "#1c8cff",
        lightRed: "#ff4c4c",
        lightGreen: "#13ff7c",
        darkYellow: "#c6b900",
        darkBlue: "#0052cc",
        darkRed: "#cc0000",
        darkGreen: "#00b300",
      },
      fontFamily: {
        alfa: ['"Alfa Slab One"', "cursive"],
        oswald: ["Oswald", "Arial", "sans-serif"],
        width: {
          15: "60px",
        },
      },
    },
  },
  plugins: [],
};
