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
        // Paleta oficial Immovi Contabilidade
        verde: "#00D4AA",
        cinzaClaro: "#DADCDF",
        cinzaMedio: "#53606C",
        azulEscuro: "#0A1D2E",
        brancoFrio: "#F8FEFD",
        azulAcinzentado: "#7690A5",
      },
      fontFamily: {
        sans: ["var(--font-albert)", "Albert Sans", "Arial", "sans-serif"],
        albert: ["var(--font-albert)", "Albert Sans", "Arial", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "2rem",
        },
        screens: {
          "2xl": "1200px",
        },
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
