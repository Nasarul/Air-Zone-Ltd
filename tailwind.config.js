/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#901A1D',
          hover: '#731215',
          light: '#FFF5F5',
          dark: '#5C0E10',
        },
        secondary: '#064368',
        accent: {
          DEFAULT: '#064368',
          light: '#F0F7FC',
          dark: '#042C44',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        sky: {
          50: '#F0F7FC',
          100: '#E0EEF7',
          200: '#B8D9EF',
          300: '#7EBAE2',
          400: '#3D98D3',
          505: '#0A5A8F',
          600: '#064368', // Brand Deep Blue
          650: '#053959',
          700: '#064368', // Brand Deep Blue
          800: '#042D45',
          900: '#031E2E',
        },
        blue: {
          50: '#FDF2F2',
          100: '#FDE8E8',
          200: '#FBD5D5',
          300: '#F8B4B4',
          400: '#F38B8B',
          500: '#E74C4C',
          600: '#901A1D', // Brand Red
          700: '#901A1D', // Brand Red
          800: '#7A1416',
          900: '#5E0E10',
        },
        brandBg: {
          light: '#F8FAFC',
          dark: '#0F172A',
          darker: '#0B0F19',
        },
        brandCard: {
          light: '#FFFFFF',
          dark: '#1E293B',
          glass: 'rgba(255, 255, 255, 0.45)',
          glassDark: 'rgba(30, 41, 59, 0.45)',
        },
        brandBorder: {
          light: '#E5E7EB',
          dark: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
