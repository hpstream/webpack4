class Demo {
  constructor() {
    this.arr = [];
  }
  push(cb) {
    this.arr.push(cb);
  }
  run() {
    var isHasAsync = false;
    var next =()=> {
      var currCb = this.arr.pop();
      var obj = {
        async: async,
        callback: currCb
      }
      obj.callback();
      if (!isHasAsync && this.arr.length!==0) {
        next();
      }
    }
     next();

    function async () {
      isHasAsync = true;
      return () => {
          next();
      }
    }
  }
}

var demo = new Demo();

demo.push(()=>{
  console.log(1);
})
demo.push(function(params) {
  var cb = this.async();
  console.log(2);
  setTimeout(() => {
    console.log('2结束了');
    cb();
  }, 3000);
})
demo.push(function (params) {
  console.log(3);
   var cb = this.async();
   setTimeout(() => {
     console.log('3结束了');
     cb();
   }, 3000);
})

demo.run();
