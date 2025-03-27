module.exports = {
    content: [
      './client/index.html',
      './src/**/*.{js,ts,jsx,tsx}', // Adjusted paths for typical project structure
    ],
    theme: {
      extend: {
        colors: {
          text: {
            primary: 'fffff',
            secondary: '#718096', 
            accent: '#2b6cb0', // Blue
          },
        },
      },
    },
    plugins: [],
  };