var arr = [
  [{type: "async",path: [1, 2, 3]},
    {type: 'sync',path: [4,5, 6]},
    {type: 'sync',path: [7, 8, 9]},
    {type: 'sync', path: [11, 12, 13]},
    {type: "async",path: [14, 15, 16]},
  ],
  [ {type: "async",path: [17, 18, 19]
    },
    {type: 'sync',path: [20, 21, 22]},
    {type: 'sync',path: [23, 24, 25]
    },
    {type: 'sync',path: [26, 27, 28]
    },
    {type: "async",path: [29, 30, 31]},
  ]
]

// type是 async 的 path 数据每隔100ms答应出来。
// type是 sync 的  path 数据直接答应出来
// 一次打印数组的所有内容
var i = 0;
j = 0;

var temj = 0;

function demo1() {
  if (j > arr[i].length - 1) {
    j=0;
    i++;
  }
  if (i > arr.length - 1) {
    return;
  }
  var row = arr[i];
  var data = row[j];

  if (data.type === 'async') {
    var timer = setInterval(() => {
      if (temj > data.path.length - 1) {
        clearInterval(timer);
        j++;
        temj = 0;
        demo1()
        return;
      }
      console.log(data.path[temj++]);
    }, 100);
  }
  if (data.type === 'sync') {
    data.path.forEach(element => {
      console.log(element);
    });
    j++;
    demo1();
  }
}
// demo1();

function demo2(callback) {
  var i=0,j=0;
  var next = () => {
    
  
    if (j > arr[i].length - 1) {
      j = 0;
      i++;
    }
    if (i > arr.length - 1) {
      return;
    }
    var row = arr[i];
    return callback(row[j++], next);
  }
  next();
}

demo2((data,next) => {
  var temj = 0;
  if (data.type === 'async') {
    var timer = setInterval(() => {
      if (temj > data.path.length - 1) {
        clearInterval(timer);
        return next();
      }
      console.log(data.path[temj++]);
    }, 100);
    return;
  }
  
  if (data.type === 'sync') {
    data.path.forEach(element => {
      console.log(element);
    });
    return next();
  }
})

