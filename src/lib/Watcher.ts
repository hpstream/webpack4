import Dep from "./Dep";
export default class Watch {
  private $vm: Record<string, any>;
  private key: string;
  private value:string;
  private cb: Function;
  constructor(vm: Record<string, any>, key: string, cb: Function) {
    this.$vm = vm;
    this.key = key;
    this.cb = cb;
    this.getVal();
  }
  public getVal(){
    Dep.target = this;
    this.value = this.$vm[this.key];
    Dep.target = null;
  }

  public updated() {
    this.cb(); 
  }
}
