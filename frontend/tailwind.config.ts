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
        bg: {
          base: "#08080F",
          surface: "#10101C",
          raised: "#18182A",
          elevated: "#20203A",
          border: "#2A2A42",
        },
        orange: {
          DEFAULT: "#FF8A00",
          light: "#FFB347",
          dark: "#CC6E00",
          muted: "rgba(255,138,0,0.15)",
        },
        purple: {
          DEFAULT: "#6C3FC4",
          mid: "#4A3080",
          deep: "#2D1B69",
          muted: "rgba(108,63,196,0.2)",
        },
        indigo: {
          DEFAULT: "#5B60C8",
          light: "#7B80E8",
          muted: "rgba(91,96,200,0.2)",
        },
        lavender: {
          DEFAULT: "#A78BFA",
          muted: "rgba(167,139,250,0.2)",
        },
        territory: {
          amber: "#C4762A",
          purple: "#7B4FD4",
          blue: "#3B6BB0",
          teal: "#1E8C82",
          crimson: "#8C3C3C",
          emerald: "#2E7D6E",
          rose: "#8C3C5C",
          navy: "#2E4A7D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        orange: "0 0 20px rgba(255,138,0,0.25)",
        "orange-sm": "0 0 10px rgba(255,138,0,0.2)",
        purple: "0 0 20px rgba(108,63,196,0.3)",
        glow: "0 0 30px rgba(255,138,0,0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-orange": "pulseOrange 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-gentle": "bounceGentle 1s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseOrange: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255,138,0,0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(255,138,0,0.5)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "app-gradient": "linear-gradient(135deg, #08080F 0%, #0F0A1E 40%, #0A0F1E 70%, #080812 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(24,24,42,0.8) 0%, rgba(16,16,28,0.8) 100%)",
        "orange-gradient": "linear-gradient(135deg, #FF8A00 0%, #FF6B00 100%)",
        "purple-gradient": "linear-gradient(135deg, #6C3FC4 0%, #4A3080 100%)",
        shimmer: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;