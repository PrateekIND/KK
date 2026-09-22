/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#1a1f2e',
          100: '#141821',
          200: '#0F1319',
          300: '#0A0D14',
          400: '#070910',
        },
        violet: {
          glow: '#8B5CF6',
        },
        cyan: {
          glow: '#06B6D4',
        },
        emerald: {
          glow: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-rotate': 'glow-rotate 8s linear infinite',
        'grid-fade': 'grid-fade 8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'grid-fade': {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};
