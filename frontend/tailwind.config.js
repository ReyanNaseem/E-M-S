// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        white: "#f5f5f5",
        black: "#010203",
      },
      fontFamily: {
        pbold: ["Poppins-Bold"],
        pregular: ["Poppins-Regular"],
        pmedium: ["Poppins-Medium"],
        psmbold: ["Poppins-SemiBold"],
      },
    },
  },
  plugins: [],
}
