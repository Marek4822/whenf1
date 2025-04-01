module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'f1-blue': '#007aff',
        'f1-dark': '#1d1d1f',
        'f1-gray': '#6e6e73',
        'f1-bg': '#f5f5f7'
      },
      boxShadow: {
        'f1-card': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'f1-container': '0 10px 30px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}