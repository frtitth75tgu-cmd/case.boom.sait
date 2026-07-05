import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070b12",
        card: "#101827",
        soft: "#182338",
        accent: "#ff8a1c",
        hot: "#ff3c6a",
        ice: "#66c0f4"
      }
    },
  },
  plugins: [],
};

export default config;
