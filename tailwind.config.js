/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1A2F',
          light: '#1a2d47',
          dark: '#050f1a',
        },
        gold: {
          DEFAULT: '#C7A14A',
          light: '#d4b669',
          dark: '#a5863d',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

