/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#606c38",
        secondary: "#fefae0",
        accent: "#bc6c25",
        darkPrimary: "#283618",
        dark: "#231f20",
        offWhite: "#FAF9F6",
      },
    },
  },
  plugins: [],
};
