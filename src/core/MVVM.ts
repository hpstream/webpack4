import Observer from "../lib/Observer";
import { proxy } from "../lib/proxy";
import Compile from "../lib/Compile";
import h from '../dom/h';
import patch from "../dom/patch";


export interface MvvmOptions {
  el?: string;
  data?: Record<string, any> | (() => Record<string, any>);
  methods?: Record<string, any>;
  template?: string;
  render?: Function;
}

export default class MVVM {
  $options: MvvmOptions;
  $el: HTMLElement;

  constructor(option: MvvmOptions) {
    this.$options = option;
    // this.$el = option.el;
    this._init();
  }
  private _init() {
    this._initData();
    this._initMethods();
    this._compile();
  }

  private _initData() {
    if(this.$options.data){
        // 数据响应代码
        new Observer(this.$options.data);
        proxy(this.$options.data,this);     
    }
  }
  private _initMethods(){
    Object.keys(this.$options.methods || {}).forEach(key => {
      this[key] = this.$options.methods[key].bind(this);
    });
  }

  private _compile() {
      const { el, template } = this.$options;
      if (!this.$options.render && (template || el)) {
        this.$options.render = Compile.render(
          template || document.querySelector(el).outerHTML
        ) as any;
      }
      if (!this.$el) {
        this.$el = document.querySelector(this.$options.el);
      }
     var lastVnode =  this.$el;
     var vnode = this.$options.render.call(this,h);
      console.log(vnode);
     patch(lastVnode, vnode);
  }
}
