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
    }
  }
});
window["vm"] = app;

// console.log(app);