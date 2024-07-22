/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        NotoSansKR: ['NotoSansKR'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newCssUtilities = {
        '.absolute_xHalf': {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        '.absolute_yHalf': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.absolute_center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.absolute_fullPage': {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          width: '100%',
          height: '100%',
        },
        '.flex_vertical_center': {
          display: 'flex',
          alignItems: 'center',
        },
        '.flex_horizontal_center': {
          display: 'flex',
          justifyContent: 'center',
        },
        '.flex_center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.flex_xBetween': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      };
      const colorUtilities = {
        '.main_colorBg': {
          backgroundColor: '#FD8889',
        },
        '.main_colorTxt': {
          color: '#FD8889',
        },
        '.gray_colorTxt': {
          color: '#757575',
        },
      };
      addUtilities(newCssUtilities, ['responsive', 'hover']);
      addUtilities(colorUtilities, ['responsive', 'hover']);
    }),
  ],
};
