import { getType } from "./utils";

export default class Observer {
  private data: Record<string, any>;

  constructor(data: Record<string, any> | any[]) {
    var dataType = getType(data);
    if (!~["object", "array"].indexOf(dataType)) return;
    // console.log(s);
    this.data = dataType === "array" ? { a: data } : data;
    this.observe();
  }
  private observe() {}
  private defineReactive(obj,key,value) {
    
    
    
  }
}
