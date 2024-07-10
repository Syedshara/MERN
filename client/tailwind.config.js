/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {

      colors: {
        'custom-dark': '#131314',
      },

    },
  },
  plugins: [require('flowbite/plugin'), require('tailwind-scrollbar'),],
}

