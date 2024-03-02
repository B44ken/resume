/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        aspectRatio: {
          'root2': '1000 / 1414'
        }
    },
  },
  plugins: [require("daisyui")],
}