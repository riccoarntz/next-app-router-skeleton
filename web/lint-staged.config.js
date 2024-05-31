module.exports = {
  // './src/**/*.{ts?(x),js?(x)}': () => ['npm run lint'],
  // './src/**/*.ts?(x)': () => ['npm run typecheck'],
  './src/**/*.{ts?(x),js,?(s)css,md,json}': () => ['npm run format'],
};
