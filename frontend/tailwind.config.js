module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'f1-blue': '#007aff',
        'f1-dark': '#1d1d1f',
        'f1-gray': '#c2c2cf',
        'f1-bg': '#121212',
        'f1-card': '#1e1e1e',
        'f1-text': '#f5f5f7'
      },
      boxShadow: {
        'f1-card': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'f1-container': '0 10px 30px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}