  /** @type {import('tailwindcss').Config} */
  module.exports = {
    /**
      * Enabling Just-in-Time (JIT) mode in Tailwind CSS enhances development efficiency by compiling styles on demand as they are used in your markup. This results in faster build times and a significantly reduced final CSS file size, as only the necessary styles are included. Additionally, JIT supports dynamic class generation, allowing for greater flexibility in styling without the need to predefine every possible class. Overall, JIT mode streamlines the development process, providing real-time updates and an improved experience.
    */
    mode: 'jit',  
    content: [
      './entrypoints/**/*.{html,ts,tsx}',
      './components/**/*.{html,ts,tsx}'
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };

