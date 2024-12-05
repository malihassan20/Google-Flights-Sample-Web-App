import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow":
          "0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2962ff",
        secondary: "#70757a",
      },
      screens: {
        'xs': '450px',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
