class plugin2 {
  apply(compiler) {
    compiler.hooks.run.tapAsync('plugin1', (compilation, callback) => {
    console.log('plugin2');
     setTimeout(() => {
        console.log('plugin2 over');
        callback();
     }, 0);
    });
  }
}
module.exports = plugin2;