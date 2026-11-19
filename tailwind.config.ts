import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutro: {
          fondo: "var(--color-neutro-fondo)",
          superficie: "var(--color-neutro-superficie)",
          base: "var(--color-base)",
        },
        ink: {
          DEFAULT: "var(--color-texto-principal)",
          muted: "var(--color-texto-secundario)",
        },
        contraste: {
          DEFAULT: "var(--color-contraste)",
          hover: "var(--color-contraste-hover)",
        },
        acento: {
          DEFAULT: "var(--color-acento)",
          secundario: "var(--color-acento-secundario)",
        },
        borde: {
          DEFAULT: "var(--color-borde)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
