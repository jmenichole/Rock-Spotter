/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earth tone primary colors
        primary: {
          50: '#faf7f2',
          100: '#f4ede1',
          200: '#e8d9c2',
          300: '#d9c09b',
          400: '#c8a271',
          500: '#b8855a', // Main brown
          600: '#a0714b',
          700: '#85593d',
          800: '#6d4732',
          900: '#583a29',
        },
        // Sage green secondary
        secondary: {
          50: '#f2f5f3',
          100: '#e1ebe4',
          200: '#c4d7ca',
          300: '#9fbda8',
          400: '#7c9082', // Main sage
          500: '#637a6a',
          600: '#4f6154',
          700: '#415044',
          800: '#364139',
          900: '#2e3530',
        },
        // Rock type colors
        igneous: '#d84a3f',      // Volcanic red
        sedimentary: '#d4a574',  // Sandy beige  
        metamorphic: '#6b8e9f',  // Slate blue
        mineral: '#8b7b9b',      // Crystal purple
        fossil: '#8b7355',       // Fossil brown
        accent: '#c67e3b',       // Copper/amber
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}