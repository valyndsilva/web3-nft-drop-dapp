/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        carrington: ["var(--font-carrington)"],
        raleway: ["var(--font-raleway)"],
      },
      fontSize: {
        md: "16px",
      },
    },
  },
  plugins: [],
};
