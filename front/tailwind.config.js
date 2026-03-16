/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        appleBlue: '#0071E3',
        appleBlueDark: '#0066CC',
        appleGreen: '#00C853',
        appleOrange: '#FF9500',
        appleGray: '#1D1D1F',
        appleGrayLight: '#6E6E73',
        appleBg: '#F5F5F7',
        borderGray: '#D2D2D7',
      },
    },
  },
  plugins: [],
  important: true,
}