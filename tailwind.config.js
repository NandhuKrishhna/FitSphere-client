const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js"
  ],
	theme: {
	  extend: {
		fontFamily: {
		  satoshi: ["Satoshi", "Arial", "sans-serif"],
		},
	  },
	},
  plugins: [require("daisyui"),heroui()],
	daisyui: {
	  themes: ["light", "dark"],
	  
	},
  };