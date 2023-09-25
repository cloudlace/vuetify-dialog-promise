module.exports = {
  root: true,
  env: {
      node: true
  },
  ignorePatterns: [ "node_modules/**", "!.eslintrc.js" ],
  extends: [
    'plugin:vue/base',
    'plugin:vuetify/base',
    'plugin:vuetify/recommended'
  ],
  overrides: [
      {
          files: [
              '**/__tests__/*.{j,t}s?(x)',
              '**/tests/unit/**/*.spec.{j,t}s?(x)'
          ],
          env: {
              jest: true
          }
      }
  ]
};