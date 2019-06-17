/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
setTimeout(() => {
  console.log(JSON.stringify(installedModules, null, 4))
}, 2000);
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var s = __webpack_require__(/*! ./index1.js */ \"./src/index1.js\")\nconsole.log(\"1\")\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/index1.js":
/*!***********************!*\
  !*** ./src/index1.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  a:1\n}\n\n//# sourceURL=webpack:///./src/index1.js?");

/***/ })

/******/ });