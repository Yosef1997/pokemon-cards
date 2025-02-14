/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#252A3E",
      white: "#FFFFFF",
      purple: "#97A0CC",
      "dark-button": "#0C1231",
      "light-purple": "#3D4466",
      "dark-blue": "#05091B",
      "dark-blue-700": "#263156",
      "green-700": "#11B047",
    },
    extend: {
      fontFamily: {
        "dm-sans": ["DM Sans"],
      },
    },
  },
  plugins: [],
}
