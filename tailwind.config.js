module.exports = {
  content: ["./views/**/*.{html,js,pug}", "./public/**/*.js"],
  theme: {
    fontFamily: {
      'display': ['Boxing', 'sans-serif'],
      'body': ['Pally', 'sans-serif']
    },
    extend: {
      boxShadow: {
        'solid': "2px 5px 0px"
      }
    }
  },
  plugins: [],
}
