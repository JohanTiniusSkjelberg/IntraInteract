/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/*.jsx",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      backgroundImage: () => ({
        'myBackground': "url('/src/assets/smartphone.jpg')",
      })
    },
  },
  plugins: [],
});