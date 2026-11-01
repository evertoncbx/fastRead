/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Editorial Suave (Livro, Papel, Cognição e Aprendizagem)
        editorial: {
          50: '#fdf8f4',
          100: '#f8ece2',
          200: '#f1d8c5',
          300: '#e4bca0',
          400: '#d49a75',
          500: '#c27a4d',
          600: '#b0623a',
          700: '#914d2e',
          800: '#763f28',
          900: '#603524',
          950: '#341a10',
        },
        paper: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e8e2d7',
          300: '#d8d0c2',
          400: '#a39b8e',
          500: '#766f63',
          600: '#585147',
          700: '#403b34',
          800: '#2c2724',
          850: '#221f1c',
          900: '#1a1816',
          950: '#131211',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5eee7',
          200: '#ccdec0',
          300: '#a6c8b2',
          400: '#7aa98b',
          500: '#568b6b',
          600: '#427054',
          700: '#355943',
          800: '#2c4736',
          900: '#243b2d',
          950: '#122018',
        },
        // Manter brand retrocompatível mas com tom editorial canela/âmbar suave
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        reading: ['Charter', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace']
      },
      animation: {
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
