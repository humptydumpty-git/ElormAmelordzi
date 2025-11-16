module.exports = {
  content: [
    "./**/*.{html,js}",
    "./index.html",
    "./projects.html",
    "./resume.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#3b82f6',
        dark: '#1f2937',
        light: '#f9fafb'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
