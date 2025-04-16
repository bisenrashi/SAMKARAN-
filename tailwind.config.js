/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "bg-light-green":"#E6F7E9",
        "bg-dark-green":"#28BF56",
        "bg-blue-light":"#47ACB0",
        "bg-blue-dark":"#33A2BF",
        "bg-black-dark":"#070A0F",
        "bg-orange":"#FF5327",
        "bg-purple":"#7179D3",
        "bg-pink":"#B24D96",
        "bg-logo":"#582FFF",
        "bg-logo-light":"#C7BCFF"
      },
      textColor:{
        "text-light-green":"#90CFA4",
        "text-dark-green":"#28BF56",
        "text-blue-light":"#47ACB0",
        "text-blue-dark":"#33A2BF",
        "text-black-dark":"#070A0F",
        "text-orange":"#FF5327",
        "text-purple":"#7179D3",
        "text-pink":"#B24D96" ,
        "text-logo":"#582FFF",
        "text-logo-light":"#5830ff"
      }
      ,
      borderColor:{
        "border-light-green":"#90CFA4",
        "border-dark-green":"#28BF56",
        "border-blue-light":"#47ACB0",
        "border-blue-dark":"#33A2BF",
        "border-black-dark":"#070A0F",
        "border-orange":"#DC874F",
        "border-purple":"#7179D3",
        "border-pink":"#B24D96",
        "border-logo":"#582FFF"
      },
      placeholderColor:{
        "place-light-green":"#90CFA4",
        "place-dark-green":"#28BF56",
        "place-blue-light":"#47ACB0",
        "place-blue-dark":"#33A2BF",
        "place-black-dark":"#070A0F",
        "place-orange":"#DC874F",
        "place-purple":"#7179D3",
        "place-pink":"#B24D96",
        "place-logo":"#582FFF"
      }
      
    },
  },
  plugins: [],
}