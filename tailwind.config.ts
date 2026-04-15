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
          DEFAULT: "#B76E79",
          50: "#FBF5F5",
          100: "#F5E8E9",
          200: "#EACED0",
          300: "#D9ADB1",
          400: "#C88D93",
          500: "#B76E79",
          600: "#9E5561",
          700: "#84454F",
          800: "#6D3A42",
          900: "#5C333A",
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
