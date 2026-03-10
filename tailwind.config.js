/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./customerPart/**/*.{html,js}"
  ],
  theme: {
    extend: {
      borderColor: {
        'custom-gray-100': '#d2d2d7', // Correct spelling
      },
    },
  },
  plugins: [],
};




