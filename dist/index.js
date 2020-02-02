
(function(graph) {
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
})({ './src/index.js':
          function(require, module, exports) {
              eval("\"use strict\";var _login = _interopRequireDefault(require(\"./src/login.js\"));var _hello = _interopRequireDefault(require(\"./src/hello.js\"));function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }console.log('------------------------------------');console.log('hello world', _login.default + _hello.default);console.log('------------------------------------');");
          },
'./src/login.js':
          function(require, module, exports) {
              eval("\"use strict\";module.exports = 'login';");
          },
'./src/hello.js':
          function(require, module, exports) {
              eval("\"use strict\";module.exports = 'hello';");
          }
});

