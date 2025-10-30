/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add this line:
  darkMode: 'class', 
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this path is correct
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}