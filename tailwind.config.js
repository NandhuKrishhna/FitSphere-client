const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|calendar|date-input|dropdown|ripple|spinner|form|menu|divider|popover).js"
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
	  themes: ["light","dark"],
	  
	},
  };