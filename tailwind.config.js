// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Updated 'purge' to 'content'
  darkMode: 'media', // Changed from false to 'media' or you can use 'class'
  theme: {
    extend: {
      fontFamily: {
        'custom': ['"Segoe UI"', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
