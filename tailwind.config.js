/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#DBEAFE',
          dark: '#1E40AF',
        },
        secondary: '#0F172A',
        accent: {
          DEFAULT: '#06B6D4',
          light: '#ECFEFF',
          dark: '#0891B2',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
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
