/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          50:  "#e8eaf6",
          100: "#c5cae9",
          200: "#9fa8da",
          300: "#7986cb",
          400: "#5c6bc0",
          500: "#3f51b5",
          600: "#3949ab",
          700: "#303f9f",
          800: "#283593",
          900: "#1a237e",
        },
        amber: {
          400: "#ffca28",
          500: "#ffb300",
        },
        bg: {
          primary:   "#0d0f1a",
          secondary: "#111827",
          card:      "#1a1f35",
        },
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float:        "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up":   "slide-up 0.6s ease-out forwards",
        "fade-in":    "fade-in 0.5s ease-out forwards",
        shimmer:      "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-16px)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "indigo-glow":      "radial-gradient(ellipse at center, rgba(63,81,181,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
