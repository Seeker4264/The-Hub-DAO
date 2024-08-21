/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'homeBg': "#1e2423",
        'custom-whitegreen': "#baf5e8",
        'custom-lightgreen': "#00c59a",
        'custom-lightgreen-highlighted': "#31ffd2",
        'custom-green-searchbar': "#15705A",
        'custom-green-searchbar-highlighted': "#138f70",
        'custom-green': "#0E493B",
        'custom-green-highlighted': "#136451",
        'custom-darkgreen': "#061F19",
        'custom-darkgreen-highlighted': "#0a3026",
      },
    },
  },
  plugins: [],
}

