//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        "theme-dark": {
          primary: "#FF70CD",
          secondary: "#E770FF",
          accent: "#6DFFCC",
          neutral: "#1D1F22",
          "base-100": "#383D47",
          info: "#70BCFF",
          success: "#70FF7E",
          warning: "#FFE570",
          error: "#FA7D7D",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  //...
};
