/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        exoFont: ["var(--font-exoFont)"],
      },
      colors: {
        greenis: "#0AE47C",
        black: "#1C1C1C",
        pink: "#DF01A5",
        orange: "#FD960B",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        admin: "url('./images/img/bg.png')",
        dashboard: "url('./images/img/dashboard-bg.png')",
      },
    },
  },
  plugins: [],
};
