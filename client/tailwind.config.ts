import type { Config } from 'tailwindcss';
import { createThemes } from 'tw-colors';
import colors from 'tailwindcss/colors';

const baseColors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
];

const shadeMapping = {
  '50': '900',
  '100': '800',
  '200': '700',
  '300': '600',
  '400': '500',
  '500': '400',
  '600': '300',
  '700': '200',
  '800': '100',
  '900': '50',
};

const generateThemeObject = (colors: any, mapping: any, invert = false) => {
  const theme: any = {};
  baseColors.forEach((color) => {
    theme[color] = {};
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = invert ? value : key;
      theme[color][key] = colors[color][shadeKey];
    });
  });
  return theme;
};

const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: '#ffffff',
  },
  dark: {
    ...darkTheme,
    white: colors.gray['950'],
    black: colors.gray['50'],
  },
};

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        pattern: "url('/images/pattern.webp')",
      },

      screens: {
        xs: '480px',
      },
      colors: {
        green: {
          DEFAULT: '#027A48',
          100: '#ECFDF3',
          400: '#4C7B62',
          500: '#2CC171',
          800: '#027A48',
        },
        red: {
          DEFAULT: '#EF3A4B',
          400: '#F46F70',
          500: '#E27233',
          800: '#EF3A4B',
        },
        blue: {
          100: '#0089F1',
        },
        light: {
          100: '#D6E0FF',
          200: '#EED1AC',
          300: '#F8F8FF',
          400: '#EDF1F1',
          500: '#8D8D8D',
          600: '#F9FAFB',
          700: '#E2E8F0',
          800: '#F8FAFC',
        },
        dark: {
          100: '#16191E',
          200: '#3A354E',
          300: '#232839',
          400: '#1E293B',
          500: '#0F172A',
          600: '#333C5C',
          700: '#464F6F',
          800: '#1E2230',
        },
        gray: {
          100: '#CBD5E1',
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [createThemes(themes), require('tailwindcss-animate')],
};

export default config;
