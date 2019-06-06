var globalThis = this;
function __skpm_run (key, context) {
  globalThis.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
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
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/createNewStyles.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/createNewStyles.js":
/*!********************************!*\
  !*** ./src/createNewStyles.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var selectedLayers = document.selectedLayers;
var selectedCount = selectedLayers.length;

var SharedStyle = __webpack_require__(/*! sketch/dom */ "sketch/dom").SharedStyle;

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var documentStyles = [];
  var regex_hasNameAndNumber = /(.*)\s(\d+)$|(.*)/;
  var regex_partialName = /^(.*(?=\s\d)|.*)/g;
  var documentTextStyles = [];
  var documentLayerStyles = [];

  if (selectedCount === 0) {
    return UI.message("No layers selected");
  }

  document.sharedTextStyles.forEach(function (item) {
    documentTextStyles.push(item.name);
  });
  document.sharedLayerStyles.forEach(function (item) {
    documentLayerStyles.push(item.name);
  });
  var styles = {};
  selectedLayers.forEach(function (item) {
    if (item.style.styleType === "Text" && item.sharedStyleId) {
      var styleName = document.getSharedTextStyleWithID(item.sharedStyleId).name;
      documentStyles = documentTextStyles;
    }

    if (item.style.styleType === "Text" && !item.sharedStyleId) {
      var styleName = item.name;
      documentStyles = documentTextStyles;
    }

    if (item.style.styleType === "Layer" && item.sharedStyleId) {
      var styleName = document.getSharedLayerStyleWithID(item.sharedStyleId).name;
      documentStyles = documentLayerStyles;
    }

    if (item.style.styleType === "Layer" && !item.sharedStyleId) {
      var styleName = item.name;
      documentStyles = documentLayerStyles;
    }

    var selectedStyleName = regex_hasNameAndNumber.exec(styleName);
    var partialStyleName = styleName.match(regex_partialName)[0];
    var newStyleName = null;
    var biggestNumber = 1;
    var numbers = [];
    documentStyles.forEach(function (el) {
      var docStyleName = regex_hasNameAndNumber.exec(el);

      if (docStyleName[1] || selectedStyleName[0] === docStyleName[1]) {
        if (docStyleName[1] === selectedStyleName[1] || selectedStyleName[0] === docStyleName[1]) {
          numbers.push(Number(docStyleName[2]));
          biggestNumber = Math.max.apply(null, numbers);
        }
      }
    });

    if (styles[partialStyleName]) {
      styles[partialStyleName].count++;
    } else {
      styles[partialStyleName] = {
        name: partialStyleName,
        count: 1
      };
    }

    if (item.sharedStyleId) {
      newStyleName = partialStyleName + " " + (biggestNumber + styles[partialStyleName].count);
    } else {
      var num = " " + styles[partialStyleName].count;

      if (styles[partialStyleName].count < 2) {
        num = "";
      }

      newStyleName = partialStyleName + " " + "Style" + num;
    }

    var newSharedStyle = SharedStyle.fromStyle({
      name: newStyleName,
      style: item.style,
      document: document
    });
    item.sharedStyleId = newSharedStyle.id;
    UI.message("Done!");
  });
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=createNewStyles.js.map