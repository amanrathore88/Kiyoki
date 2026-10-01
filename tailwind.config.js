/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          brand: '#3168E8',
          hover: '#2456D2',
          light: '#EEF4FF',
          accent: '#38BDF8',
        },
        dark: {
          bg: '#0A0D14',
          surface: '#111622',
          card: '#161C2C',
          border: '#232C42',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        'header': '88px',
        'hero': '470px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px rgba(0, 0, 0, 0.08)',
        'blue-glow': '0 8px 24px rgba(49, 104, 232, 0.25)',
      }
    },
  },
  plugins: [],
}
