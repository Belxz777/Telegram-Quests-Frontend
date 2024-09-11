import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
   backgroundColor:{
    scin:{
      base:'var(--tg-theme-bg-color)'
    },
    hint:{
      base:'var(--tg-theme-hint-color)'
    },
    button:{
      base:'var(--tg-theme-button-color)'
    },
    secodary:{
      base:' var(--tg-theme-secondary-bg-color);'
    }
   },
   textColor:{
    scin:{
      base:'var(--tg-theme-text-color)'
    },
    link:{
      base: 'var(--tg-theme-link-color)'
    },
    button:{
      base:'var(--tg-theme-button-text-color)'
    }

   },
borderColor:{
base:' var(--tg-theme-link-color)'
}
  
    },
  },
  plugins: [],
}
export default config