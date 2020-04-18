module.exports = {
  extends: ['@hamburgueria60/eslint-config-default'],
  settings: {
    'import/resolver': 'module-alias',
  },
  rules: {},
  overrides: [
    {
      files: ['prettier.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
