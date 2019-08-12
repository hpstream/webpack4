const path = require('path');
var lessLoader = require('./loader/lessLoader.js');
var plugin2 = require('./plugin/plugin2.js');
var plugin1 = require('./plugin/plugin1.js');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    // libraryTarget: 'commonjs2'
  },
  module: {
    rules:[{
      test: /\.less/,
      use:[
       /*  path.resolve(__dirname, 'loader/css-loader.js'),
        path.resolve(__dirname, 'loader/lessLoader.js') */
      ]
    }, {
      test: /\.js/,
      use: [
        // path.resolve(__dirname, 'loader/js1.js'),
        // path.resolve(__dirname, 'loader/js2.js')
      ]
    }]
  },
  plugins: [
    new plugin1(),
    new plugin2(),
    
  ]
}