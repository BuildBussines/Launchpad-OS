import type { Config } from "tailwindcss";

// Design tokens for Launchpad OS — see DESIGN_SYSTEM.md for full rationale.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1120", // primary background — deep blueprint navy
        panel: "#111B30", // raised panel surface
        panel2: "#16223C", // secondary panel / hover state
        line: "#2A3A57", // hairline grid + borders
        line2: "#1C2A46", // faint grid lines
        paper: "#F0EDE4", // light contrast section (pricing)
        paperLine: "#D9D4C4",
        amber: "#FFB020", // primary accent — caution-tape amber
        amberDim: "#8A6420",
        signal: "#FF5E45", // countdown / alert accent, used sparingly
        "text-hi": "#EEF1F7",
        "text-lo": "#8C97AF",
        "text-ink": "#141B2B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
      backgroundImage: {
        grid:
          "linear-gradient(#1C2A46 1px, transparent 1px), linear-gradient(90deg, #1C2A46 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.15" },
        },
        rise: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        blink: "blink 1.6s steps(1) infinite",
        rise: "rise 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
