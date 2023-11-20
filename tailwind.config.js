/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "dark-blue": "#1E293B",
      navy: "#121B2D",
      danger: "#e3342f",
    }),
    extend: {},
  },
  plugins: [],
};
