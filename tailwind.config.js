/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    boxShadow: {
      neon: "0 0 7px theme('colors.purple.400')",
    },
  },
};
export const plugins = [];
