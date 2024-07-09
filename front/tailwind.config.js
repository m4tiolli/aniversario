/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter"],
        "seasons": ["Seasons"],
        "madina": ["Madina"]
      },
      colors: {
        "rosa": {
          "300": "#e4bab7",
          "400": "#e2abac",
          "500": "#b37275"
        }
      }
    },
  },
  plugins: [],
}

