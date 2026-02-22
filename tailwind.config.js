/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B4332",      // Deep green
        secondary: "#40916C",    // Medium green
        accent: "#74C69D",       // Light green
        light: "#D8F3DC",        // Very light green
        dark: "#081C15",         // Near black green
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}