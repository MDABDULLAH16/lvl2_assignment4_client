/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'primary-gradient': 'linear-gradient(30deg,#DC02C3,#5C53F3)'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
