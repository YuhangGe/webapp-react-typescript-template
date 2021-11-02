module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-prettier/recommended'
  ],
  customSyntax: 'postcss-less',
  rules: {
    'prettier/prettier': [true, { singleQuote: false }],
  },
};
