module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'clg': '1200px',
        'cxl': '1350px'
      },
      colors: {
        'primary': 'var(--primary)',
        'alpha': 'var(--alpha-bg)',
        'progress': 'var(--progress)',
        'bg': 'var(--primary)',
        'border': 'var(--border-color)',
        'sidebar-bg': 'var(--sidebar-bg)'
      },
      spacing: {
        17: '4.375rem',
        22: '5.5rem'
      },
      scale: {
        '85': '.85'
      },
      backgroundColor: {
        'loading': 'var(--loading-bg)'
      },
      backgroundImage: {
        'loading-img': 'linear-gradient(90deg,transparent,var(--loading-bg-animation),transparent)'
      },
      translate: {
        '65/100': '65%'
      }
    },
    textColor: theme => ({
      ...theme('colors'),
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'primary': 'var(--background)',
      'active': 'var(--tab-active)'
    })
  },
  variants: {
  },
  plugins: [],
}
