module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@hamburgueria60/eslint-config-default/vue',
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'vue/no-unused-components': 'warn',
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['public/index.html'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
      },
    },
    {
      files: ['vue.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['config/**/*.js', 'middlewares/**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
