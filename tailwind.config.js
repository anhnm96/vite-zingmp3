module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'alpha': 'var(--alpha-bg)',
        'progress': 'var(--progress)'
      }
    },
    textColor: theme => ({
      ...theme('colors'),
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
    }),
    scale: {
      '85': '.85'
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'primary': 'var(--background)',
      'active': 'var(--tab-active)'
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
