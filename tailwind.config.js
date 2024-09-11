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
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
