/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      fontFamily: {
      Montserrat: ["Montserrat"],
      Itim: ["Itim"],
      Poppins: ["Poppins"],
      Inter: ["Inter"],
      Roboto: ["Roboto"],
      Abhaya: ['Abhaya Libre']
    },
    extend: {
      boxShadow: {
        inset: "inset 0 4px 4px rgba(0, 0, 0, 0.3)",
        "3d": "2px 3px 5px rgba(0, 0, 0, 0.5)",
      },

      screens: {
        's1': '680px',
        's2': '780px',
        's3': '880px',
        's4': '1100px',
        's5': '1300px',
      },

      colors: {
        primary: {
          100: "#EBF9FA",
          200: "#BCE2E5",
        },
        secondary: "#0A3F67",
        accent: "#2D867F",
    correct: "#0ACF1E",
        wrong: "#E01111",
        disabled : "#D2D6D9"
      },
      backgroundImage: {
        flashcraftBg: "url(./src/Assets/Background/flashcraftBg.jpg)",
        profileBg: "url(./src/Assets/Background/profileBg.jpg)"
      },
      backfaceVisibility: {
        visible: "visible",
        hidden: "hidden",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".transform-style-preserve-3d": {
          "transform-style": "preserve-3d",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};