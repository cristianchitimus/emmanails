import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: "#D4537E",
          50: "#FDF2F6",
          100: "#FAE5ED",
          200: "#F5CCDB",
          300: "#EDA6C1",
          400: "#E079A0",
          500: "#D4537E",
          600: "#C03A65",
          700: "#A12D52",
          800: "#862744",
          900: "#71253C",
        },
        nude: {
          DEFAULT: "#F5E6D3",
          50: "#FFFCF8",
          100: "#FEF6EE",
          200: "#F5E6D3",
          300: "#EDD3B5",
          400: "#E2BD94",
          500: "#D6A573",
        },
        dark: {
          DEFAULT: "#1A1A1A",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#D4D4D4",
          300: "#A3A3A3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#2E2E2E",
          800: "#1A1A1A",
          900: "#0A0A0A",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        wider: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
