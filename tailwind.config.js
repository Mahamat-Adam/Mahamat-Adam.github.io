/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F6',
        card: '#FFFFFF',
        ink: '#16181D',
        night: '#0B0C10',
        panel: '#14161C',
        line: '#E5E2DA',
        nline: '#23262E',
        accent: '#E63946',
        accentSoft: '#FF6B76',
        // darker red for small text on light backgrounds, where #E63946 falls
        // below the 4.5:1 contrast minimum
        accentInk: '#B3121F',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        wrap: '72rem',
      },
    },
  },
  plugins: [],
}
