/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  server: {
    port: 3000
  },
  plugins: [require("daisyui"), react()],
}