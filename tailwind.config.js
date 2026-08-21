/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0D12',
        'void-raised': '#12161D',
        mist: '#F6F5F1',
        'mist-raised': '#FFFFFF',
        ink: '#14171B',
        fog: '#C7CDD6',
        muted: '#8A93A0',
        'muted-light': '#6B7280',
        signal: '#00D9A3',
        amber: '#FF9F43',
        'line-dark': '#232A33',
        'line-light': '#E4E2DC',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-light': 'linear-gradient(#E4E2DC 1px, transparent 1px), linear-gradient(90deg, #E4E2DC 1px, transparent 1px)',
        'grid-dark': 'linear-gradient(#1A2029 1px, transparent 1px), linear-gradient(90deg, #1A2029 1px, transparent 1px)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
}
