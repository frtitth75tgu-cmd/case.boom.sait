import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07080d",
        card: "#10131d",
        soft: "#171c2b",
        accent: "#f6c453",
        hot: "#ff4d6d",
        ice: "#62e6ff",
        boom: "#f6c453"
      },
      boxShadow: {
        boom: "0 0 60px rgba(246,196,83,.18)"
      }
    },
  },
  plugins: [],
};

export default config;
