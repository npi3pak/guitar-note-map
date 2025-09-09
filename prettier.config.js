
export default {
  printWidth: 120,
  singleQuote: true,
  tabWidth: 4,
  // plugins: [prettierPluginTailwindcss],
  overrides: [
    {
      files: '*.css',
      options: {
        tabWidth: 2,
        printWidth: 240,
      },
    },
  ],
};