import Observer from "../lib/Observer";

export interface MvvmOptions {
  el: string;
  data: Record<string, any> | (()=> Record<string, any>)
}

export default class MVVM {
  $option: MvvmOptions;
  $el: string;

  constructor(option: MvvmOptions) {
    this.$option = option;
    // this.$el = option.el;
    this._init();
  }
  private _init() {
    this._initData();
    this._compile();
  }

  private _initData() {
    if(this.$option.data){
        new Observer(this.$option.data);
    }
    

  }

  private _compile() {}
}
