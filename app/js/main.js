!function(e){var r={};function _(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,_),o.l=!0,o.exports}_.m=e,_.c=r,_.d=function(e,r,n){_.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},_.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},_.t=function(e,r){if(1&r&&(e=_(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(_.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)_.d(n,o,function(r){return e[r]}.bind(null,o));return n},_.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return _.d(r,"a",r),r},_.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},_.p="",_(_.s="./src/js/main.js")}({"./src/js/components/burger.js":
/*!*************************************!*\
  !*** ./src/js/components/burger.js ***!
  \*************************************/
/*! exports provided: burgerToggle */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"burgerToggle\", function() { return burgerToggle; });\n\n\nfunction burgerToggle() {\n  console.log('burger');\n}\n\n//# sourceURL=webpack:///./src/js/components/burger.js?")},"./src/js/functions/sayHi.js":
/*!***********************************!*\
  !*** ./src/js/functions/sayHi.js ***!
  \***********************************/
/*! exports provided: sayHi */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sayHi\", function() { return sayHi; });\n\n\nfunction sayHi() {\n  console.log('hello world! Webpack cy4ki');\n}\n\n//# sourceURL=webpack:///./src/js/functions/sayHi.js?")},"./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _functions_sayHi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/sayHi */ "./src/js/functions/sayHi.js");\n/* harmony import */ var _components_burger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/burger */ "./src/js/components/burger.js");\n\n\n\n //import Swiper from \'swiper\';  //Работает, если свайпер скачан с npm\n\nObject(_functions_sayHi__WEBPACK_IMPORTED_MODULE_0__["sayHi"])();\nObject(_components_burger__WEBPACK_IMPORTED_MODULE_1__["burgerToggle"])();\n\n//# sourceURL=webpack:///./src/js/main.js?')}});
//# sourceMappingURL=main.js.map
