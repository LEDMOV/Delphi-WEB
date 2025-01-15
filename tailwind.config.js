module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'delphi-blue': '#1e40af',
        'delphi-green': '#10b981',
      },
      fontFamily: {
        'custom': ['"Open Sans"', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
