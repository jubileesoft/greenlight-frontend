module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto',
  overrides: [{ files: '*.hbs', options: { parser: 'glimmer', singleQuote: false } }],
};
