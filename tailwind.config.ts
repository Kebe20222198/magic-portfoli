import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode — changed from cream #f7f5f2 to pure white #ffffff based on request
        'bg-light':     '#ffffff',      
        'bg-light-end': '#ffffff',      
        'card-light':   '#ffffff',
        'text-primary': '#111218',      
        'text-secondary':'#52525b',     
        'accent':       '#4f46e5',      

        // Tokens supplémentaires light
        'badge-border': '#e4e2de',      

        // Dark mode
        'bg-dark':               '#0b1120',
        'card-dark':             '#060b16',
        'text-primary-dark':     '#f3f4f6',
        'text-secondary-dark':   '#9ca3af',
        'badge-border-dark':     '#0d1628',
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
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
      },
      fontFamily: {
        sans: ["var(--font-space-mono)", "monospace"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
