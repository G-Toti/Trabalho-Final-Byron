import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    //"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    //"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    //"./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // using ./src/ dir
    "./src/**/*.{js,ts,jsx,tsx}",
    // using ./ dir
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add more paths here
  ],
  theme: {
    extend: {
     /* backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },*/
      colors: {
        gray:
        {
          lightest: "#F0F0F0",
          light: "#E0D8D8",
          base: "#D9D9D9",
          dark: "#4E4F4C", 
          darkest: "#555555"
        },
        yellow: 
        {
          base: "#D8DC0F",
          dark: "#A0A153"
        }
      },
      fontFamily: {
        'inter': ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
