const path = require('path')

module.exports = {
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        includePaths: [
          path.resolve(process.cwd(), 'sass'),
          path.resolve(process.cwd(), 'node_modules'),
          path.resolve(process.cwd(), '../../../../node_modules'),
        ],
      },
    },
  ],
}
