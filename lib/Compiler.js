const path = require('path');
const fs = require('fs');
const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generator = require('@babel/generator').default;
// babylon 主要就是把源码转换成ast;
// @babel/parser  转换成ast 语法树
// @babel/traverse 
// @babel/types
// @babel/generator
class Compiler {
  constructor(config){
    this.config = config;
    this.entryId;
    this.modules = {};
    this.entry = config.entry;
    this.root = process.cwd();
  }
  getSource(modulePath) {
    return fs.readFileSync(modulePath,'utf8');
  }
  buildModule(modulePath,isEntry) {
    let source = this.getSource(modulePath);
    let moduleName = './' + path.relative(this.root, modulePath);
    if (isEntry){
      this.entryId = moduleName;
    }
    let { sourceCode,dependencies } = this.parse(source, path.dirname(moduleName));
    this.modules[moduleName] = sourceCode;
    dependencies.forEach(dep=>{
      this.buildModule(path.join(this.root,dep),false);
    })

  }
  emitFile(){

  }
  parse(source,parentPath){
    // var sourceCode = 0;
    let dependencies = [];
    let ast = parse(source);
    traverse(ast,{
      callExpression(p){
        let p = p.node;
        if(node.callee.name === 'require'){
          node.callee.name = '__webpack_require__';
          let modulesName = node.arguments[0].value;
          modulesName = modulesName + (path.extname(modulesName))?'':'.js';
          modulesName = './'+path.join(parentPath,modulesName);
          dependencies.push(modulesName);
          node.arguments = [t.stringLiteral(modulesName)];

        }
      }
    })
    var sourceCode = generator(ast).code;

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