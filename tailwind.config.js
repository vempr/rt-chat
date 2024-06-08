/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "satoshi-light": ["Satoshi-Light", "sans-serif"],
        "satoshi-light-italic": ["Satoshi-LightItalic", "sans-serif"],
        "satoshi-regular": ["Satoshi-Regular", "sans-serif"],
        "satoshi-italic": ["Satoshi-Italic", "sans-serif"],
        "satoshi-medium": ["Satoshi-Medium", "sans-serif"],
        "satoshi-medium-italic": ["Satoshi-MediumItalic", "sans-serif"],
        "satoshi-bold": ["Satoshi-Bold", "sans-serif"],
        "satoshi-bold-italic": ["Satoshi-BoldItalic", "sans-serif"],
        "satoshi-black": ["Satoshi-Black", "sans-serif"],
        "satoshi-black-italic": ["Satoshi-BlackItalic", "sans-serif"],
        "satoshi-variable": ["Satoshi-Variable", "sans-serif"],
        "satoshi-variable-italic": ["Satoshi-VariableItalic", "sans-serif"],
      },
      textColor: {
        "dom-blue": "#003285",
        "sub-blue": "#2A629A",
      },
      backgroundColor: {
        "darkest-g": "#191d24",
        "darker-g": "#222831",
        "dark-g": "#393E46",
      },
    },
  },
  plugins: [],
};
