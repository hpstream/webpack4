var path = require('path');
var loaders = [{
    loader: '/Users/wanba/code/mycode/webpack4/loader/css-loader.js',
    options: undefined
  },
  {
    loader: '/Users/wanba/code/mycode/webpack4/loader/lessLoader.js',
    options: undefined
  }
]
class plugin1 {
  apply(compiler) {
    compiler.hooks.compilation.tap('plugin1', (compilation, callback) => {    
      compilation.hooks.normalModuleLoader.tap('ss', (conetent, module) => {
        var {resource} =module;
        // console.log(resource)
        if (resource.indexOf('.less') > -1){
            module.loaders = loaders;
        }    
        // console.log(module)
      })

    });
  }
}
module.exports = plugin1;