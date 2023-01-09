/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ["responsive", "focus", "hover", "active"],
    border: ["responsive", "focus", "hover", "active"], 
  },
  plugins: [],
}