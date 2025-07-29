/** @type {import('tailwindcss').Config} */
export default {
  content: ['*'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],

        playfair: ['Playfair Display', 'serif'],
        merriweather: ['Merriweather', 'serif'],
        crimson: ['Crimson Text', 'serif'],
        libre: ['Libre Baskerville', 'serif'],

        sourceSans: ['Source Sans Pro', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif'],
        workSans: ['Work Sans', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],

        raleway: ['Raleway', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        vibes: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}