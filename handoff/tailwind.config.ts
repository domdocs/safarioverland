// ============================================================================
// Safari Overland — Tailwind config patch
//
// Replace your existing tailwind.config.ts with this file.
//
// Notable changes from the v0-generated default:
//   • Colour palette is now driven by CSS variables in app/globals.css
//     (see handoff/tokens.css). Means dark/light mode works automatically
//     and every shadcn component re-skins for free.
//   • Adds `serif` and `mono` font families wired to next/font CSS variables.
//   • Adds editorial type scale and letter-spacing utilities.
//   • Default radius is 0 — editorial = no rounding. Override per-component
//     where you want it (cards, buttons in dialogs).
// ============================================================================

import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm:  "2rem",
        lg:  "3.5rem",
        xl:  "4rem",
      },
      screens: {
        "2xl": "1480px",
      },
    },
    extend: {
      colors: {
        // Token-driven — change in tokens.css, propagates everywhere.
        night:      "rgb(var(--night) / <alpha-value>)",
        ink:        "rgb(var(--ink) / <alpha-value>)",
        card:       "rgb(var(--card) / <alpha-value>)",
        rule:       "rgb(var(--rule) / <alpha-value>)",
        bone:       "rgb(var(--bone) / <alpha-value>)",
        "bone-mute":"rgb(var(--bone-mute) / <alpha-value>)",
        mute:       "rgb(var(--mute) / <alpha-value>)",
        amber:      "rgb(var(--amber) / <alpha-value>)",
        "amber-deep":"rgb(var(--amber-deep) / <alpha-value>)",
        flame:      "rgb(var(--flame) / <alpha-value>)",
        moss:       "rgb(var(--moss) / <alpha-value>)",

        // shadcn semantic — wired through tokens.
        border:      "rgb(var(--border) / <alpha-value>)",
        input:       "rgb(var(--input) / <alpha-value>)",
        ring:        "rgb(var(--ring) / <alpha-value>)",
        background:  "rgb(var(--background) / <alpha-value>)",
        foreground:  "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT:    "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT:    "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT:    "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT:    "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT:    "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        // Wire to next/font in app/layout.tsx — see brief.
        sans:  ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono:  ["var(--font-mono)"],
      },
      fontSize: {
        eyebrow:  ["11px", { letterSpacing: "0.22em", lineHeight: "1.2" }],
        mono:     ["12px", { letterSpacing: "0.16em", lineHeight: "1.4" }],
        "h4-fluid":     "clamp(20px, 2vw, 28px)",
        "h3-fluid":     "clamp(24px, 2.8vw, 40px)",
        "h2-fluid":     "clamp(32px, 4vw, 64px)",
        "h1-fluid":     "clamp(40px, 5.5vw, 88px)",
        "display-fluid":"clamp(56px, 8vw, 128px)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.03em",
        tight:    "-0.02em",
        editorial:"-0.01em",
        eyebrow:  "0.22em",
      },
      borderRadius: {
        // Editorial = sharp by default. Use rounded-md (6px) for dialogs.
        none: "0",
        sm:   "2px",
        DEFAULT: "0",
        md:   "6px",
        lg:   "12px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
