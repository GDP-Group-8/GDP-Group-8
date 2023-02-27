/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./screens/*.js", "./components/**/*.{js,jsx,ts,tsx}}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
