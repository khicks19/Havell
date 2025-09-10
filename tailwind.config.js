/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { red: "#E3362C" } },
      fontFamily: { sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Inter','Roboto','sans-serif'] }
    },
  },
  plugins: [],
}