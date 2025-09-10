/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { red: "#E3362C", dark: "#0B0D10" }
      }
    },
  },
  plugins: [],
}