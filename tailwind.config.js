/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js", "./data/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary-rgb) / <alpha-value>)",
          light: "rgb(var(--color-primary-light-rgb) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark-rgb) / <alpha-value>)"
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary-rgb) / <alpha-value>)",
          light: "rgb(var(--color-secondary-light-rgb) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent-rgb) / <alpha-value>)",
          dark: "rgb(var(--color-accent-dark-rgb) / <alpha-value>)"
        },
        ink: {
          DEFAULT: "rgb(var(--color-ink-rgb) / <alpha-value>)",
          soft: "rgb(var(--color-ink-soft-rgb) / <alpha-value>)"
        },
        surface: "rgb(var(--color-surface-rgb) / <alpha-value>)",
        "surface-alt": "rgb(var(--color-surface-alt-rgb) / <alpha-value>)"
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Public Sans'", "system-ui", "sans-serif"]
      },
      maxWidth: {
        prose: "68ch"
      },
      letterSpacing: {
        wideish: "0.02em"
      }
    }
  },
  plugins: []
};
