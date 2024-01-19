/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
