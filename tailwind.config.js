/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-brown": "#E8DCD3",
        "warm-brown": "#B09280",
        "bright-yellow": "#EAE62F",
        "soft-blue": "#698AC5",
        "dark-gray": "#262626",
        "light-gray": "#FBFAFA",
      },
    },
  },
  plugins: [],
};
