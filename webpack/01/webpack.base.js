const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[id].[name].[hash:8].js',
    path: path.resolve('build'),
    // libraryTarget: 'commonjs2'
  }

}