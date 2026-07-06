/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        enstays: {
          green: '#163B2F',
          gold: '#C9A45C',
          ivory: '#F7F3EA',
          ink: '#1F2933',
          slate: '#6B7280',
          blue: '#1F5A7A',
          success: '#157347',
          danger: '#B42318',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(22, 59, 47, 0.10)',
      },
    },
  },
  plugins: [],
};
