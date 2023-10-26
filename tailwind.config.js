import forms from "@tailwindcss/forms";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      animation: ['group-hover'],
    },
  },
  plugins: [
    forms()
  ],
}