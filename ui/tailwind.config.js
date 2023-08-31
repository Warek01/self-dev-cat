/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,js,tsx,jsx,css,scss,sass,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '0px',
      },
      colors: {
        black: '#2D2D2D',
        'input-bg': '#F3F3F3',
        'card-bg': '#FFFCF5',
        'card-bg-dark': '#2d3436',
        'card-border': '#FFD285',
        'heading-green': '#009379',
        'pink-bg': '#F9E6F0',
        'link-blue': '#3498db',
        'dark-black': '#2C3333',
        'dark-black-lighter': '#363d3d',
        'dark-white': '#E3F6FF',
        'disabled': '#636e72',
        'error': '#e84118',
        'error-disabled': '#b33939',
        'accept-green': '#2ecc71'
      },
      spacing: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
        '11xl': '112rem',
        '12xl': '120rem',
      },
      margin: {
        '1/8': '12.5%',
      },
      fontFamily: {
        epilogue: 'var(--font-epilogue)',
        inconsolata: 'var(--font-inconsolata)',
      },
      fontSize: {
        17: '17px',
      },
      opacity: {
        '15': '15%',
      },
    },
  },
}
