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
          50: "#F0F7FC",
          100: "#DAEAF7",
          200: "#B5D5EF",
          300: "#8FBFE7",
          400: "#6AAADF",
          500: "#4494D6",
          600: "#1466A7",
          700: "#0F5289",
          800: "#0B3F6A",
          900: "#072C4C",
        },
        secondary: {
          DEFAULT: "#101642",
          foreground: "#ffffff",
          50: "#F4F4F9",
          100: "#E9E9F2",
          200: "#D3D3E6",
          300: "#BDBDD9",
          400: "#A7A7CD",
          500: "#9191C0",
          600: "#1E2263",
          700: "#101642",
          800: "#0C102F",
          900: "#080A1F",
        },
        accent: {
          DEFAULT: "#3F8CCA", // A slightly lighter blue that complements primary
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
        "float": "float 6s ease-in-out infinite",
        "gradient-text": "gradient-text 8s linear infinite",
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
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" }
        },
        "gradient-text": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
