/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Apple-style grayscale system
        ink: {
          50: '#f5f5f7',
          100: '#e8e8ed',
          200: '#d2d2d7',
          400: '#86868b',
          500: '#6e6e73',
          700: '#3a3a3c',
          900: '#1d1d1f',
          950: '#000000',
        },
        accent: {
          DEFAULT: '#a78bfa', // soft violet — used very sparingly
          blue: '#0a84ff',     // Apple's system blue
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'SF Pro Display', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'SF Mono', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        'tighter-2': '-0.03em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        marquee: 'marquee 38s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseSoft: { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
