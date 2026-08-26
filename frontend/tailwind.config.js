/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F4EF",
        charcoal: "#1A1A18",
        ink: "#0E0E0D",
        stone: {
          50: "#F7F6F3",
          100: "#EDEBE5",
          200: "#DAD6CC",
          300: "#BFB9AC",
          400: "#9C9484",
          500: "#7A7264",
          600: "#5E5749",
          700: "#453F35",
          800: "#2E2A24",
          900: "#1C1A16",
        },
        bronze: {
          DEFAULT: "#A08145",
          light: "#C0A063",
          dark: "#7E6534",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      maxWidth: {
        container: "1320px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "line-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
      },
    },
  },
  plugins: [],
}
