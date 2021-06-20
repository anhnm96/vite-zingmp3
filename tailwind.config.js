module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'alpha': 'var(--alpha-bg)',
        'progress': 'var(--progress)',
        'bg': 'var(--primary)',
        'border': 'var(--border-color)'
      },
      spacing: {
        17: '4.375rem',
        22: '5.5rem'
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
