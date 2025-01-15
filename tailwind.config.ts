import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textColor: {
        DEFAULT: "#101642",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1466A7",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#101642",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#1466A7",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'gradient-start': '#F5F8FC',
        'gradient-end': '#FAFBFD',
        'dark-bg': '#101642',
      },
      textOpacity: {
        '85': '0.85',
        '75': '0.75',
        '65': '0.65',
      },
      animation: {
        "flow-right": "flow 15s linear infinite",
        "scroll": "scroll 25s linear infinite",
      },
      keyframes: {
        flow: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
