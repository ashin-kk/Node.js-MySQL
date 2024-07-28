module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    // parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['prettier', 'standard'],

  plugins: [],

  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    camelcase: [2, { properties: 'never' }],
    'comma-dangle': ['error', 'only-multiline'],
    semi: [2, 'always'],
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': ['error', 'always'],
  },
};
