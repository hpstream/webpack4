// 实现一个简易的webpack打包工具
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const babel = require('@babel/core');

function HWebpack(options) {
    return new Webpack(options);
}
class Webpack {
    constructor(options) {
        var {
            entry,
            output
        } = options;
        this.$options = options;
        this.entry = entry; // 获取入口js
        this.path = output.path; // 存储输出的目录
        this.content = process.cwd();
        this.run();
    }

    run() {
        var moduleObj = {};
        // 解析 js 中的依赖
        this.parse(this.entry, moduleObj);
        // 生成打包好的文件
        this.emit(this.entry, moduleObj);
    }
    parse(entry, moduleObj) {
        var _this = this;
        // 读取文件
        const content = fs.readFileSync(entry, 'utf-8');
        // 将字符串，转成抽象语法书
        const Ast = parser.parse(content, {
            sourceType: 'module'
        });
        // 得到依赖
        const dependencies = {};
        // 处理 import hello from './hello.js'; 这种引入依赖，将其转成json的形式存储在dependencies
        traverse(Ast, {
            ImportDeclaration({
                node
            }) {
                const dirname = path.dirname(_this.entry);
                const newFile = './' + path.join(dirname, node.source.value);
                node.source.value = newFile;
                dependencies[node.source.value] = newFile;
            }
        });
        // 转换成浏览器可以直接执行的代码
        const {
            code
        } = babel.transformFromAst(Ast, null, {
            presets: ['@babel/preset-env']
        });
        // 存储依赖
        moduleObj[entry] = `
          function (require, module, exports) {
            eval(${JSON.stringify(code.replace(/[\r\n]/g, ''))})
          }
        `;
        // 	解决深度依赖的问题
        for (var j in dependencies) {
            this.parse(dependencies[j], moduleObj);
        }

    // return {
    //     filename: this.entry,
    //     dependencies,
    //     code
    // };
    }

    // 1.拿到入口文件，读取文件
    // 解析里面的依赖，
    // 依赖读取文件，继续解析依赖
    emit(entry, moduleObj) {
    // 导出文件
    // const graph = JSON.stringify(moduleObj);
        var strArr = [];
        Object.keys(moduleObj).forEach((key) => {
            strArr.push(`'${key}':${moduleObj[key]}`);
        });
        var str = `
            (function(graph){
                 var installedModules = {};

                 function localRequire(moduleId) {
                   if (installedModules[moduleId]) {
                     return installedModules[moduleId].exports;
                   }
                   var module = (installedModules[moduleId] = {
                     i: moduleId,
                     l: false,
                     exports: {}
                   });
                   graph[moduleId].call(
                     this,
                     localRequire,
                     module,
                     module.exports,
                   );
                   return module.exports;
                 }
                 return localRequire('./src/index.js');
            })({${strArr.join(',')}})
        `;
        fs.writeFileSync(path.join(this.content, this.path, 'index.js'), str);
    }
}

module.exports = HWebpack;
