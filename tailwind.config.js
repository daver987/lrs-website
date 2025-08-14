/** @type {import("tailwindcss").Config} */

module.exports = {
  darkMode: 'class',
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `compatibles/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter var'", 'caviar-dreams'],
        brand: ['caviar-dreams'],
        'brand-heading': ['campton-thin'],
        'brand-subheading': ['caviar-dreams-bold'],
        'brand-body': ['campton-light'],
        subheading: ['caviar-dreams-bold'],
        heading: ['campton-thin'],
        body: ['campton-light'],
      },
      fontSize: {
        xxs: '0.675rem',
      },
      colors: {
        brand: {
          50: 'rgb(var(--brand-50-rgb) / <alpha-value>)',
          100: 'rgb(var(--brand-100-rgb) / <alpha-value>)',
          200: 'rgb(var(--brand-200-rgb) / <alpha-value>)',
          300: 'rgb(var(--brand-300-rgb) / <alpha-value>)',
          400: 'rgb(var(--brand-400-rgb) / <alpha-value>)',
          500: 'rgb(var(--brand-500-rgb) / <alpha-value>)',
          DEFAULT: 'rgb(var(--brand-500-rgb) / <alpha-value>)',
          600: 'rgb(var(--brand-600-rgb) / <alpha-value>)',
          700: 'rgb(var(--brand-700-rgb) / <alpha-value>)',
          800: 'rgb(var(--brand-800-rgb) / <alpha-value>)',
          900: 'rgb(var(--brand-900-rgb) / <alpha-value>)',
        },
        secondary: {
          50: '#EEF2F7',
          100: '#DDE5EE',
          200: '#BACCDE',
          300: '#98B3CD',
          400: '#7599BD',
          DEFAULT: '#537FAC',
          600: '#42668A',
          700: '#324D67',
          800: '#213345',
          900: '#111A22',
        },
        grey: {
          100: '#999999',
          200: '#888888',
          300: '#777777',
          400: '#666666',
          DEFAULT: '#555555',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
        body: {
          50: '#EBEBEB',
          100: '#D6D6D6',
          200: '#ADADAD',
          300: '#858585',
          400: '#5C5C5C',
          DEFAULT: '#333333',
          600: '#262626',
          700: '#1F1F1F',
          800: '#141414',
          900: '#0A0A0A',
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },

  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
}
