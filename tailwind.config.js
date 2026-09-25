/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      short: { raw: "(max-height: 760px) and (min-width: 1024px)" },
    },
    extend: {
      colors: {
        // light surfaces are CSS variables (see index.css) so the palette can be swapped in one place
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          raised: "rgb(var(--paper-raised) / <alpha-value>)",
          deep: "rgb(var(--paper-deep) / <alpha-value>)",
        },
        chip: {
          DEFAULT: "rgb(var(--chip-bg) / <alpha-value>)",
          border: "rgb(var(--chip-border) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "#191613",
          body: "#423D38",
          secondary: "#6C6762",
          muted: "#736D68",
          btn: "#1A1714",
        },
        hairline: {
          DEFAULT: "rgb(var(--hairline) / <alpha-value>)",
          strong: "rgb(var(--hairline-strong) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "#C8321F",
          signal: "#FF3B2F",
          night: "#FF7A63",
          tint: "#F6DDD5",
        },
        night: {
          DEFAULT: "rgb(var(--night) / <alpha-value>)",
          raised: "rgb(var(--night-raised) / <alpha-value>)",
          border: "rgb(var(--night-border) / <alpha-value>)",
          text: "#F6F4F0",
          secondary: "#A5A29E",
          muted: "#8B8985",
          btn: "#F2EFE6",
          outline: "#6D6C68",
        },
        pastel: {
          periwinkle: "#C6D7FD",
          sage: "#E5EADF",
          blush: "#EFDCD6",
          sand: "#EAE3D3",
        },
      },
      fontFamily: {
        // Two families only: Satoshi for everything, Instrument Serif italic for the accent word.
        display: ["Satoshi", "system-ui", "sans-serif"],
        accent: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ["Satoshi", "system-ui", "sans-serif"],
        mono: ["Satoshi", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "1.04", letterSpacing: "-0.035em" }],
        h1: ["var(--text-h1)", { lineHeight: "1.04", letterSpacing: "-0.032em" }],
        h2: ["var(--text-h2)", { lineHeight: "1.12", letterSpacing: "-0.022em" }],
        h3: ["var(--text-h3)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        quote: ["var(--text-quote)", { lineHeight: "1.16", letterSpacing: "-0.01em" }],
        "stat-xl": ["var(--text-stat-xl)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        stat: ["var(--text-stat)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        lede: ["var(--text-lede)", { lineHeight: "1.45" }],
        body: ["var(--text-body)", { lineHeight: "1.58" }],
      },
      maxWidth: { container: "80rem", content: "72.5rem", prose: "46rem" },
      borderRadius: { badge: "6px", panel: "16px", card: "20px" },
      transitionTimingFunction: {
        emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: { 250: "250ms", 400: "400ms", 550: "550ms" },
    },
  },
  plugins: [],
};
