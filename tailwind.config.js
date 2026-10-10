/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // hover styles only where a real pointer can hover — no stuck states after a tap
  future: { hoverOnlyWhenSupported: true },
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      // Two colours. Greys exist only for secondary text and hairlines.
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        mute: "#6B6B6B", // secondary text on white (5.3:1)
        line: "#E6E6E6", // hairline on white
        surface: "#F2F2F2", // the one quiet surface, for covers
        dim: "#8F8F8F", // secondary text on black (6.4:1)
        rule: "#262626", // hairline on black
      },
      fontFamily: {
        display: ['"GT Standard"', '"Funnel Display"', "system-ui", "sans-serif"],
        sans: ['"GT Standard"', '"Funnel Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        giant: ["var(--text-giant)", { lineHeight: "0.86", letterSpacing: "-0.04em" }],
        d1: ["var(--text-d1)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        d2: ["var(--text-d2)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        d3: ["var(--text-d3)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        lead: ["var(--text-lead)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        body: ["var(--text-body)", { lineHeight: "1.5", letterSpacing: "0" }],
        meta: ["0.9375rem", { lineHeight: "1.4", letterSpacing: "0" }],
        micro: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.01em" }],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      transitionDuration: { 400: "400ms", 600: "600ms", 900: "900ms" },
    },
  },
  plugins: [],
};
