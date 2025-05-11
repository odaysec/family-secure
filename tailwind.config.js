/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0c0c0f',
        'cyber-dark': '#121218', 
        'cyber-gray': '#1e1e26',
        'cyber-light': '#2a2a36',
        'neon-green': '#00ff9d',
        'neon-green-dim': '#00cc7d',
        'neon-blue': '#00f0ff',
        'neon-blue-dim': '#00c0cc',
        'alert-red': '#ff355e',
        'alert-orange': '#ff9f1c',
        'alert-green': '#00ff9d',
      },
      fontFamily: {
        'mono': ['Consolas', 'Monaco', 'Menlo', 'monospace'],
        'terminal': ['VT323', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'scanline': 'scanline 5s linear infinite',
        'blink': 'blink 1s infinite',
        'typing': 'typing 3.5s steps(30, end)',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #00ff9d, 0 0 10px #00ff9d' },
          '100%': { textShadow: '0 0 15px #00ff9d, 0 0 20px #00ff9d, 0 0 30px #00ff9d' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23202030' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
};