// commonjs
(() => {
  var __es__module = {
    "./common/a.js": (__es_module__, __es_exports__, __es_require__) => {
      eval("let a = 'A';__es_module__.__es_exports__ = { a };");
    },
    "./common/b.js": (__es_module__, __es_exports__, __es_require__) => {
      eval("const a = __es_require__('./common/a.js');console.log(a)");
    }
  };
  var __es_module_cache__ = {};
  var __es_require__ = function(moduleId) {
    var cachedModule = __es_module_cache__[moduleId];
    if (cachedModule !== undefined) return cachedModule.__es_exports__;
    var module = __es_module_cache__[moduleId] = {
      __es_exports__: {}
    };
    __es__module[moduleId](module, module.__es_exports__, __es_require__);
    return module.__es_exports__
  };
  var __es_exports__ = __es_require__("./common/b.js");
})();

// es module
(() => {
  "use strict";
  var __es__module = {
    "./es/a.js": (__es_module__, __es_exports__, __es_require__) => {
      eval("__es_require__.r(__es_exports__);/* harmony export */ __es_require__.d(__es_exports__, { /* harmony export */ 'default': () => (__ES_DEFAULT_EXPORT__),/* harmony export */ show: () => (/* binding */ show),/* harmony export */   x: () => (/* binding */ x)});let x = 1;function show() {console.log(x)}/* harmony default export */ const __ES_DEFAULT_EXPORT__ = 2;")
    },
    "./es/b.js": (__es_module__, __es_exports__, __es_require__) => {
      eval("__es_require__.r(__es_exports__);/* harmony import */ var _b_js__es_IMPORTED_MODULE_0__ = __es_require__('./es/a.js');console.log(_b_js__es_IMPORTED_MODULE_0__.x, _b_js__es_IMPORTED_MODULE_0__['default'])")
    }
  }
  var __es_module_cache__ = {};
  var __es_require__ = function(moduleId) {
    var cachedModule = __es_module_cache__[moduleId];
    if (cachedModule !== undefined) return cachedModule.__es_exports__;
    var module = __es_module_cache__[moduleId] = {
      __es_exports__: {}
    };
    __es__module[moduleId](module, module.__es_exports__, __es_require__);
    return module.__es_exports__
  };
  (() => {
    // define getter functions for harmony exports
    __es_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__es_require__.o(definition, key) && !__es_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
        }
      }
    }
  })();
  (() => {
    __es_require__.o = (obj, prop) => {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
  })();
  (() => {
    __es_require__.r = (__es_exports__) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(__es_exports__, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(__es_exports__, '__esModule', {
        value: true
      })
    }
  })();
  var __es_exports__ = __es_require__("./es/b.js");
})();