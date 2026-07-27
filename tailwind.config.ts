import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06141B",
        abyss: "#08202B",
        deep: "#0A2A33",
        teal: {
          DEFAULT: "#0E5A63",
          light: "#15767F",
        },
        aqua: {
          DEFAULT: "#2CC4D6",
          light: "#5FDCE8",
          deep: "#1793A5",
        },
        gold: {
          DEFAULT: "#C9A24B",
          light: "#E4C77E",
          deep: "#A57F2E",
        },
        platinum: "#D8DDE2",
        foam: "#EAF6F7",
        sand: "#F6F3EC",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(44,196,214,0.45)",
        gold: "0 0 40px -10px rgba(201,162,75,0.5)",
        lift: "0 30px 60px -25px rgba(6,20,27,0.55)",
      },
      backgroundImage: {
        "aqua-grad": "linear-gradient(135deg, #2CC4D6 0%, #1793A5 60%, #0E5A63 100%)",
        "gold-grad": "linear-gradient(135deg, #E4C77E 0%, #C9A24B 55%, #A57F2E 100%)",
        "ink-fade": "linear-gradient(180deg, rgba(6,20,27,0) 0%, rgba(6,20,27,0.85) 100%)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wave: {
          "0%,100%": { transform: "translateX(0) translateZ(0)" },
          "50%": { transform: "translateX(-25px) translateZ(0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-1%, -3%)" },
          "30%": { transform: "translate(2%, 2%)" },
          "50%": { transform: "translate(-2%, 1%)" },
          "70%": { transform: "translate(1%, -1%)" },
          "90%": { transform: "translate(-1%, 3%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        wave: "wave 8s ease-in-out infinite",
        grain: "grain 0.7s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
