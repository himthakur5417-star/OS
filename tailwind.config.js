/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        academy: {
          white: "#FFFFFF",
          soft: "#FAFAF9",
          cream: "#FAF7F2",
          tan: "#EFECE6",
          navy: "#0B192C",
          "navy-muted": "#1E293B",
          slate: "#334155",
          border: "#E2E8F0",
        },
        sky: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
        },
        pink: {
          blush: "#FFF1F2",
          soft: "#FCE7EC",
          accent: "#FB7185",
        },
        gold: {
          light: "#F7E6B5",
          DEFAULT: "#C8A84E",
          dark: "#A38431",
          muted: "rgba(200, 168, 78, 0.12)",
        },
        tactical: {
          black: "#171D15",
          forest: "#2E4B35",
          camo: "#3D5A3F",
          tan: "#C8A84E",
        }
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "serif"],
        label: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
        'soft-md': '0 12px 30px -10px rgba(15, 23, 42, 0.06)',
        'soft-lg': '0 25px 50px -15px rgba(15, 23, 42, 0.08)',
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.08)',
        'gold-glow': '0 0 25px -5px rgba(200, 168, 78, 0.25)',
      }
    },
  },
  plugins: [],
};
