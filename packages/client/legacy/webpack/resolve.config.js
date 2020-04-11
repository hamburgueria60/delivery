const path = require('path')

const rootPath = path.join(__dirname, '..')

/**
 * Determine the array of extensions that should be used to resolve modules.
 */
module.exports = {
  resolve: {
    modules: [path.join(rootPath), path.join(rootPath, 'node_modules')],
    extensions: ['.js', '.jsx'],
  },
}
