/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "discord-lighter": "#42464D",
        "discord-light": "#36393F",
        discord: "#32353B",
        "discord-dark": "#2F3136",
        "discord-darker": "#18191C",
        "discord-font-light": "#BDBEC0",
        "discord-font": "B9BBBE",
        "discord-accent": "#7289DA",
      },
    },
  },
  daisyui: {
    styles: true,
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          background: "#36393F",
          accent: "#7289DA",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
