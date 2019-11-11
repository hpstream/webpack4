import './css/index.less';
import MVVM from './core/MVVM';


var app = new MVVM({
  el:"app",
  data:{
     value: 'value'
  }
})

console.log(app);