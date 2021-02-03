module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight:{
        '680px': '680px'
      },
      colors:{
        yellow:{
          light:'#eee6d4fe'
        }
      }, 
      backgroundImage:{
        'bike_sharing': "url('/img/bike_sharing_bg_white.png')", 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
