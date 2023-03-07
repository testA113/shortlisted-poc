/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "5vw": "5vw", // pull featured sections and navbar in the margin
        "10vw": "10vw", // page margin
      },
      maxWidth: {
        "page": "96rem",
      },
      keyframes: {
        "slow-pulse-start": {
          "0%": { opacity: 1 },
          "80%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "slow-pulse": {
          "0%": { opacity: 0 },
          "20%": { opacity: 1 },
          "80%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "slow-pulse-end": {
          "0%": { opacity: 0 },
          "20%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "slow-pulse-start": "slow-pulse-start 4s ease-in-out infinite",
        "slow-pulse": "slow-pulse 4s ease-in-out infinite",
        "slow-pulse-end": "slow-pulse-end 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
