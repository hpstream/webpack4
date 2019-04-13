require('../css/index.less');
var {
  wb,
  sa,
  ticketCsrf,
  wbComponent
} = require('front-common')(window, document, $);
import {
  SilderLike,
  SilderLikeItem
} from '../vue/index';
var commonUrl = "/web/webApi/";
// -----------处理t票和__cf------------
ticketCsrf && new ticketCsrf(72115091);
var msg_title = '话题配置';
Vue.use(wbComponent);
var getTagOwnerInfo = commonUrl + "tag/getTagOwnerInfo";

var app = new Vue({
  el:'#app',
  data:{},
  components:{
    SilderLike,
    SilderLikeItem
  },
  methods: {
    getTagOwnerInfo(){
       var that = this;
       wb.request({
         url: '',
         data: {},
         success: res => {
           if (res.code == 0) {
             // console.log(toUid);
           } else {
             this.$refs.toast.toastFun(res.rsg);
           }
         }
       })
    }
  },
  mounted() {
    
  }
})