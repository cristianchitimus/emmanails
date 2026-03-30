import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: "#D4537E",
          50: "#FDF2F6",
          100: "#FAE5ED",
          200: "#F5CCDB",
          300: "#EDA6C0",
          400: "#E07A9F",
          500: "#D4537E",
          600: "#B83A64",
          700: "#9A2E50",
          800: "#7D2742",
          900: "#6B2439",
        },
        nude: {
          DEFAULT: "#F5E6D3",
          50: "#FDF9F4",
          100: "#FAF1E7",
          200: "#F5E6D3",
          300: "#EDD4B8",
          400: "#E3BF9A",
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
          700: "#2D2D2D",
          800: "#1A1A1A",
          900: "#0F0F0F",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
