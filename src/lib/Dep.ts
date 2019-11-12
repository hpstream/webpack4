import Watcher from "./Watcher";

let depId = 1;
export default class Dep {
  private subs: Watcher[] = [];
  private depId: number;
  public static target: Watcher;
  constructor() {
    this.depId = depId++;
  }

  public add(watcher: Watcher) {
    this.subs.push(watcher);
  }

  public notify() {
    this.subs.forEach(sub => {
      sub.updated();
    });
  }
}
