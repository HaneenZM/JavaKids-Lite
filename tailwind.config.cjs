const { resolveProjectPath } = require('wasp/dev')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    resolveProjectPath('./src/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  colors.teal[50],
          100: colors.teal[100],
          200: colors.teal[200],
          300: colors.teal[300],
          400: colors.teal[400],
          500: colors.teal[500],
          600: colors.teal[600],
          700: colors.teal[700],
          800: colors.teal[800],
          900: colors.teal[900],
        }
      }
    },
  },
}