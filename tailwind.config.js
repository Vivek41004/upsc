// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path correctly points to your source files
    "./public/index.html", // Include your public HTML if you have it
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};