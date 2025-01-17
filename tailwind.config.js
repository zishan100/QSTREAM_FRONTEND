/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "primary":'#262626',
        "secondary":'#000'
      },
      textColor:{
        "primary":"#fafafa"
      }
    },

  },
  plugins: [],
}

