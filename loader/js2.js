

function js2(source) {
console.log('------------------------------------');
console.log('我爱的我的国家');
console.log('------------------------------------');
  var cb = this.async();
  setTimeout(() => {
      console.log('source' + 2)
    cb(null, source)
  }, 0);
  return 1;
  
}

module.exports = js2;