/** @type {import('tailwindcss').Config} */
export default {
 content: [
  ",/index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./src/*.{js,ts,jsx,tsx}"
 ],
  theme: {
    extend: {
      colors: {
        primary: "#5f6FFF",
        secondary: "#1e40af",
        accent: "#f59e0b",
        background: "#f3f4f6",
        text: "#111827",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
}

