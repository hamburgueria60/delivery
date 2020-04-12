module.exports = {
  extends: ['@hamburgueria60/eslint-config-default/angular'],
  globals: {
    $: true,
    io: true,
    moment: true,
    _: true,
    StringMask: true,
  },
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      parcel: { rootDir: 'src' },
    },
  },
  rules: {
    'consistent-return': 'warn',
    'max-classes-per-file': 'warn',
    'no-multi-assign': 'warn',
    'no-plusplus': 'warn',
    'no-prototype-builtins': 'warn',
    'no-restricted-globals': 'warn',
    'no-restricted-syntax': 'warn',
    'no-shadow': 'warn',
    'no-underscore-dangle': 'warn',
    'no-unused-expressions': 'warn',
    'no-use-before-define': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'radix': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'react/static-property-placement': 'warn',
  },
  overrides: [
    {
      files: ['src/utils/**/*.js'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
}
