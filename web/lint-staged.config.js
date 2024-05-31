module.exports = {
  'web/**/*.{ts?(x),js?(x)}': () => ['npm run lint'],
  'web/**/*.ts?(x)': () => ['npm run typecheck'],
  'web/**/*.{ts?(x),js,?(s)css,md,json}': () => ['npm run format'],
};
