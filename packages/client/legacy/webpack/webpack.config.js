const path = require('path')
const nodeExternals = require('webpack-node-externals')

const config = require('./resolve.config')
const styleRule = require('./style.config')
const templateRule = require('./template.config')
const es6Rule = require('./es6.config')
const plugins = require('./plugins.config')

module.exports = {
  mode: ['production', 'development'].includes(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development',
  devtool: '#inline-source-map',
  entry: { app: './index.js' },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].bundle.js',
  },
  externals: [
    { angular: 'angular' },
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../../node_modules'),
    }),
  ],
  resolve: config.resolve,
  module: {
    rules: [es6Rule, templateRule, styleRule],
  },
  plugins,
}
