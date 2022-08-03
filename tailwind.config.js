module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      'dm-sans': ['DM Sans', 'sans-serif'],
      display: ['Staatliches', 'cursive'],
      body: ['DM Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'deep-purple': '#151748',
        pink: '#fd387c',
        'light-gray': '#f1f1f1',
        twitter: '#1da1f2',
        linkedIn: '#0a66c2',
        facebook: '#1877f2',
        instagram: '#c32aa3',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            visibility: 'visible',
            opacity: '0',
          },
          '100%': {
            visibility: 'visible',
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            visibility: 'visible',
            opacity: '1',
          },
          '100%': {
            visibility: 'visible',
            opacity: '0',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0, 0, 0, 1.85) 0s 1 forwards',
        'fade-out': 'fade-out 0.5s ease-out 0s 1 forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
