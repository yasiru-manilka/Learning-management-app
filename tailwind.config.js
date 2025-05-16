/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2a4a7f',
          dark: '#0f2942',
        },
        secondary: {
          DEFAULT: '#e2e8f0',
          light: '#f8fafc',
          dark: '#cbd5e1',
        },
        accent: {
          DEFAULT: '#f6ad55',
          light: '#fbd38d',
          dark: '#ed8936',
        },
        success: {
          DEFAULT: '#48bb78',
          light: '#68d391',
          dark: '#38a169',
        },
        warning: {
          DEFAULT: '#ecc94b',
          light: '#f6e05e',
          dark: '#d69e2e',
        },
        error: {
          DEFAULT: '#f56565',
          light: '#fc8181',
          dark: '#e53e3e',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};