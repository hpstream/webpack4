import './css/index.less';
import MVVM from './core/MVVM';

var app = new MVVM({
  el: "#app",
  data: {
    value: "value",
    arr:['2','3']
  },
  methods: {
    click() {
      this.value = "我是大哥";
      console.log(1)
    }
  }
});
window["vm"] = app;

// console.log(app);