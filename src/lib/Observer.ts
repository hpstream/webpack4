import { getType } from "./utils";
import { proxy } from "./proxy";
import Dep from "./Dep";

export default class Observer {
  private $data: Record<string, any>;

  constructor(data: Record<string, any> | any[]) {
    var dataType = getType(data);
    if (!~["object", "array"].indexOf(dataType)) return;
    // console.log(s);
    this.$data = dataType === "array" ? { a: data } : data;
    this.observe();
  }
  private observe() {
    Object.keys(this.$data).forEach((key:string)=>{
        this.defineReactive(key);
    })

  }
  private defineReactive(key:string) {
    var dep = new Dep();
    var oldvalue = this.$data[key];
    
    proxy(this.$data, key, {
      get: function getter() {
          if(Dep.target){
            dep.add(Dep.target);
          }
           return oldvalue;
      },
      set:function setter(newvalue) {
        if (oldvalue === newvalue) return;
         oldvalue = newvalue;
         dep.notify();
             
        // return value; 
      }
    });
    
  }
}
