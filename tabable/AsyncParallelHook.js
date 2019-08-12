// AsyncParallelHook 钩子：tapAsync/callAsync 的使用
const {
  AsyncParallelHook,
  AsyncSeriesHook,
} = require("tapable");

// 创建实例
let asyncParallelHook = new AsyncSeriesHook(["name", "age"]);
// 异步串行
// 异步并行
// 注册事件
console.time("time");
asyncParallelHook.tapAsync("1", (name, age, done) => {
  console.log('gameOver1')
  setTimeout(() => {
    console.log("1", name, age, new Date());
    done();
  }, 1000);
});

asyncParallelHook.tapAsync("2", (name, age, done) => {
  console.log('gameOver2')
  setTimeout(() => {
    console.log("2", name, age, new Date());
    done();
  }, 2000);
});

asyncParallelHook.tapAsync("3", (name, age, done) => {
  console.log('gameOver3')
  setTimeout(() => {
    console.log("3", name, age, new Date());
    done();
    console.timeEnd("time");
  }, 3000);
});

// 触发事件，让监听函数执行
asyncParallelHook.callAsync("panda", 18, () => {
    console.log("complete");
});