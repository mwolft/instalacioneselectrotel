module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "bg-slide": "bgSlide 0.3s ease-out forwards",
      },
      keyframes: {
        bgSlide: {
          "0%": { backgroundSize: "0% 100%" },
          "100%": { backgroundSize: "100% 100%" },
        },
      },
    },
  },
  plugins: [],
};
