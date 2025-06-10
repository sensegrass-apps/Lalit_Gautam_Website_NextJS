/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-new': '#4347FF', 
        primary: '#ffffff',
        secondary: '#000000',
        "test-gray": '#B9B9B9'
      },
      fontFamily: {
        sans: ["var(--font-sora)"],
        poly: ["var(--font-poly)"],
        archivo: ["var(--font-archivo)"],
        poppins: ["var(--font-poppins)"],
        "plus-jakarta": ["var(--font-plus-jakarta-sans)"],
         annie: ["var(--font-annie)"],
         aiguilette: ['var(--font-aiguilette)']
      },
      animation: {
        blink: 'blink 1s step-end infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
    },
  },
};