/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        enstays: {
          bg: '#081120',
          bg2: '#0A1628',
          surface: '#0F1F38',
          surface2: '#13243F',
          panel: '#112240',
          gold: '#D4A94E',
          goldSoft: 'rgba(212,169,78,0.14)',
          goldLine: 'rgba(212,169,78,0.32)',
          text: '#FFFFFF',
          text2: 'rgba(255,255,255,0.72)',
          text3: 'rgba(255,255,255,0.50)',
          line: 'rgba(255,255,255,0.09)',
          lineStrong: 'rgba(255,255,255,0.16)',
          new: '#6FB1E8',
          newBg: 'rgba(111,177,232,0.14)',
          newLine: 'rgba(111,177,232,0.40)',
          progress: '#E0A33E',
          progressBg: 'rgba(224,163,62,0.14)',
          progressLine: 'rgba(224,163,62,0.40)',
          done: '#4ADE80',
          doneBg: 'rgba(74,222,128,0.13)',
          doneLine: 'rgba(74,222,128,0.40)',
          urgent: '#E8806F',
          urgentBg: 'rgba(232,128,111,0.13)',
          urgentLine: 'rgba(232,128,111,0.40)',
          teal: '#2DD4BF',
          sky: '#56B0E8',
          amber: '#F0A93C',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SF Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        console: '16px',
      },
      boxShadow: {
        console: '0 10px 34px rgba(0,0,0,0.40)',
        gold: '0 5px 16px rgba(212,169,78,0.28)',
        lift: '0 18px 50px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        console: 'linear-gradient(135deg, #081120 0%, #0A1628 46%, #0F1F38 100%)',
      },
    },
  },
  plugins: [],
};