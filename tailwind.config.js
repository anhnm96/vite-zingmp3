module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)'
      }
    },
    textColor: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)'
    },
    scale: {
      '85': '.85'
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'alpha': 'var(--alpha-bg)'
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
