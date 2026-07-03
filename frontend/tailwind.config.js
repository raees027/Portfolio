/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root', // To ensure Tailwind doesn't conflict with Material UI default styles
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0b0d',
          card: 'rgba(17, 19, 23, 0.75)',
          border: 'rgba(56, 189, 248, 0.15)',
          glow: '#06b6d4', // Cyan
          success: '#10b981', // Emerald/Green
          warning: '#f59e0b', // Amber
          error: '#ef4444', // Red
          violet: '#8b5cf6' // Violet
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.3)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.3)',
        'glow-violet': '0 0 15px rgba(139, 92, 246, 0.3)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.3)',
      }
    },
  },
  plugins: [],
}
