module.exports = {
  test: /\.?template.html$/,
  use: [
    {
      loader: 'file-loader',
      options: { publicPath: '/dist/' },
    },
  ],
}
