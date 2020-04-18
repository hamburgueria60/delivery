const autoprefixer = require('autoprefixer')
const focusWithin = require('postcss-focus-within')
const focusVisible = require('postcss-focus-visible')
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const settings = require('./environment/settings')

module.exports = {
  devServer: {
    port: settings.port,
    proxy: {
      '/api': { target: 'http://localhost:4000', secure: false },
      '/auth': { target: 'http://localhost:4000', secure: false },
      '/graphql': { target: 'http://localhost:4000', secure: false },
    },
    disableHostCheck: true,
  },
  configureWebpack: {
    plugins: [].filter(Boolean),
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('webpack-report').use(new BundleAnalyzerPlugin({ analyzerMode: 'static' }))
      config.plugin('CompressionPlugin').use(CompressionPlugin)
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: () => [focusWithin, focusVisible, autoprefixer],
      },
    },
    sourceMap: true,
  },
}
