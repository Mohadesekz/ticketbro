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
    backgroundImage: {
      "hatch-pattern":
        "linear-gradient(135deg,rgba(24,35,54,1) 25%,transparent 25%,transparent 50%,rgba(24,35,54,1) 50%,rgba(24,35,54,1) 75%,transparent 75%,transparent)",
    },
    backgroundSize: {
      hatch: "25px 25px",
    },
    extend: {},
  },
  plugins: [],
};
