import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // مسیر اضافه شده
  ],
  theme: {
    extend: {
      boxShadow: {
        primary: "0px 0px 15px -2px #0505051c", // سایه جدید
        secondary: "1px 1px 3px 1px #00000020", // سایه جدید
      },
      gridTemplateColumns: {
        auto_2fr: "auto minmax(0, 1fr)",
      },
      backgroundImage: {
        "baner-gradient":
          "linear-gradient(to right, #127D56, #139969, #127D56)",
        "fade-gradient":
          "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.90) 30%, rgba(255, 255, 255, 0) 100%)",
      },
      fontFamily: {
        light: ["Light", ...defaultTheme.fontFamily.sans],
        black: ["Black", ...defaultTheme.fontFamily.sans],
        regular: ["Regular", ...defaultTheme.fontFamily.sans],
        Bold: ["Bold", ...defaultTheme.fontFamily.sans],
        Medium: ["Medium", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#d3ffd3",
          100: "#9BE39CFF",
          500: "#08A70AFF",
          700: "#056406FF",
        },
        secondary: {
          100: "#92E0C8FF",
          500: "#069D6E",
          700: "#045E42FF",
        },
        success: {
          100: "#FEE4E2FF",
          500: "#F04438FF",
          700: "#B42318FF",
        },
        gray: {
          25: "#FCFCFDFF",
          50: "#F7F8FAFF",
          100: "#F0F1F5FF",
          200: "#E2E4EBFF",
          300: "#D0D3DBFF",
          400: "#9CA0ADFF",
          500: "#6B6F7DFF",
          600: "#4F5463FF",
          700: "#393F52FF",
          800: "#20273BFF",
          900: "#0F1526FF",
        },
        warning: {
          100: "#FEF0C7FF",
          500: "#F79009FF",
          700: "#B54708FF",
        },
        send: {
          700: "#3161A4",
        },
      },
      iconSize: {
        sm: 16,
        md: 24,
        lg: 32,
        xl: 40,
        xxl: 48,
      },
      width: {
        small: "202px",
        medium: "272px",
      },
      height: {
        small: "355px",
        medium: "425px",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        openCircle: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        closeCircle: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
      },
      animation: {
        slideUp: "slideUp 0.4s ease-out",
        slideDown: "slideDown 0.4s ease-out",
        openCircle: "openCircle 0.4s ease-out",
        closeCircle: "closeCircle 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;