const path = require('path')
const ConcatPlugin = require('webpack-concat-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const WebpackStylish = require('webpack-stylish')
const Assets = require('./assets')

module.exports = [
  new Dotenv(),
  new webpack.NamedModulesPlugin(),
  new WebpackStylish(),

  new ConcatPlugin({
    name: 'external',
    fileName: '[name].bundle.js',
    filesToConcat: Assets.JS.map(asset => {
      const finalPath = !asset.withoutMinified
        ? `./node_modules/${asset.minifiedPath || `${asset.path}.min`}.js`
        : `./node_modules/${asset.path}.js`

      return path.resolve(finalPath)
    }),
  }),
  new ConcatPlugin({
    name: 'external',
    fileName: '[name].bundle.css',
    filesToConcat: Assets.CSS.map(asset => {
      const finalPath = !asset.withoutMinified
        ? `./node_modules/${asset.minifiedPath || `${asset.path}.min`}.css`
        : `./node_modules/${asset.path}.css`

      return path.resolve(finalPath)
    }),
  }),
]
