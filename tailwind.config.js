/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8F9FA', // Off-white shimmer (Moonlight)
          100: '#EBF0F2', 
          200: '#D5DCDE',
          300: '#B2BABB',
          400: '#8A9292',
          500: '#64696A',
          600: '#535758',
          700: '#424546',
          800: '#393D3F', // Deep cool gray (Tranquil Midnight)
          900: '#2A2E30',
          950: '#1C1F20',
        },
        accent: {
          50: '#F1F9F8',
          100: '#DFEFEF',
          200: '#C0DFDE',
          300: '#93C5C2', // Calming Seafoam
          400: '#6BB0AD',
          500: '#4D9995', 
          600: '#3A7A78',
          700: '#316361',
          800: '#264D4B',
          900: '#20413F',
          950: '#102422',
        },
        dark: {
          50: '#FFFFFF',
          100: '#FDFDFD',
          200: '#F3F4F6',
          300: '#E5E7EB',
          400: '#D1D5DB',
          500: '#9CA3AF',
          600: '#6B7280',
          700: '#4B5563',
          800: '#374151',
          900: '#1F2937',
          950: '#111827',
        },
      },
      fontFamily: {
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      boxShadow: {
        'retro-sm': '2px 2px 0px rgba(0,0,0,1)',
        'retro-md': '4px 4px 0px rgba(0,0,0,1)',
        'retro-lg': '8px 8px 0px rgba(0,0,0,1)',
        'retro-glow': '0 0 16px rgba(147, 197, 194, 0.4)', // subtle seafoam glow
      },
      backgroundImage: {
        'retro-grid': 'linear-gradient(rgba(248, 249, 250, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(248, 249, 250, 0.03) 1px, transparent 1px)',
        'retro-noise': 'url("/noise.svg")',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
