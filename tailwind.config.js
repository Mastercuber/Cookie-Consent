module.exports = {
  prefix: '',
  separator: ':',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      animation: { top: 'animate-top 0.4s' },
      keyframes: {
        'animate-top': {
          from: {
            'margin-top': '-300px',
            opacity: 0
          },
          to: {
            'margin-top': 0,
            opacity: 1
          }
        },
      }
    },
  },
  plugins: [],
  corePlugins: [
    'width',
    'height',
    'cursor',
    'textColor',
    'textAlign',
    'animate',
    'backgroundColor',
    'opacity',
    'transitionProperty',
    'transitionDuration',
    'borderRadius',
    'borderColor',
    'position',
    'inset',
    'userSelect',
    'fontSize',
    'zIndex',
    'margin',
    'padding',
    'overflow',
    'fontWeight',
    'translate',
    'display',
    'flex',
    'transform'
  ]
}
