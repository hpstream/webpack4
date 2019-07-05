const path = require('path');
const fs = require('fs');
class Compiler {
  constructor(config){
    this.config = config;
    this.entryId;
    this.modules = {};
    this.entry = config.entry;
    this.root = process.cwd();
  }
  getSource(modulePath,isEntry) {
    return fs.readFileSync(modulePath,'utf8');
  }
  buildModule(modulePath) {
    let source = this.getSource(modulePath);
    let moduleName = './' + path.relative(this.root, modulePath);
    if (isEntry){
      this.entryId = moduleName;
    }
    let { sourceCode,dependencies } = this.parse(source, path.dirname(moduleName));
    this.modules[moduleName] = sourceCode;

  }
  emitFile(){

  }
  parse(source,parentPath){
   return {
      sourceCode,
      dependencies
    }
  }
  run(){
    this.buildModule(path.resolve(this.root,this.entry),true);

    this.emitFile();
  }
}

module.exports = Compiler