/** @type {import('tailwindcss').Config} */
import { colorConfig } from './scrablog.config'

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: { ...colorConfig },
    },
  },
  plugins: [],
}
