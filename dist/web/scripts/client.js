(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["runarbot"] = factory();
	else
		root["runarbot"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for managing Microsoft Teams themes
 * idea borrowed from the Dizz: https://github.com/richdizz/Microsoft-Teams-Tab-Themes/blob/master/app/config.html
 */
class TeamsTheme {
    /**
     * Setup themes on a page
     */
    static fix() {
        microsoftTeams.initialize();
        microsoftTeams.registerOnThemeChangeHandler(TeamsTheme.themeChanged);
        microsoftTeams.getContext(function (context) {
            TeamsTheme.themeChanged(context.theme);
        });
    }
    /**
     * Manages theme changes
     * @param theme default|contrast|dark
     */
    static themeChanged(theme) {
        if (theme === "default") {
            var css = document.getElementById("themeCSS");
            if (css) {
                css.setAttribute("href", TeamsTheme.themedStyleSheets[0]);
            }
            var body = document.getElementsByTagName("body");
            if (body.length === 1) {
                body[0].style.background = "#fff"; //special case for default
            }
        }
        else if (theme === "contrast") {
            var css = document.getElementById("themeCSS");
            if (css) {
                css.setAttribute("href", TeamsTheme.themedStyleSheets[1]);
            }
            var body = document.getElementsByTagName("body");
            if (body.length === 1) {
                body[0].style.background = "inherit";
            }
        }
        else if (theme === "dark") {
            var css = document.getElementById("themeCSS");
            if (css) {
                css.setAttribute("href", TeamsTheme.themedStyleSheets[2]);
            }
            var body = document.getElementsByTagName("body");
            if (body.length === 1) {
                body[0].style.background = "inherit";
            }
        }
    }
}
TeamsTheme.themedStyleSheets = [
    "https://statics.teams.microsoft.com/hashedcss/stylesheets.min-e05e0092.css",
    "https://statics.teams.microsoft.com/hashedcss/stylesheets.theme-contrast.min-669e1eed.css",
    "https://statics.teams.microsoft.com/hashedcss/stylesheets.theme-dark.min-fe14eeb8.css"
];
exports.TeamsTheme = TeamsTheme;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Default entry point for client scripts
// Automatically generated
// Please avoid from modifying to much...

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Added by generator-teams
__export(__webpack_require__(3));
__export(__webpack_require__(4));
// Added by generator-teams
__export(__webpack_require__(2));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const theme_1 = __webpack_require__(0);
/**
 * Implementation of Bot pinned tab: runarbot Bot Tab
 */
class runarbotBotTabTab {
    constructor() {
        microsoftTeams.initialize();
        theme_1.TeamsTheme.fix();
    }
    doStuff() {
        microsoftTeams.getContext((context) => {
            var a = document.getElementById('app');
            if (a) {
                // do something
            }
        });
    }
    getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return '';
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}
exports.runarbotBotTabTab = runarbotBotTabTab;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const theme_1 = __webpack_require__(0);
/**
 * Implementation of runarbot Tab configuration page
 */
class runarbotTabConfigure {
    constructor() {
        microsoftTeams.initialize();
        theme_1.TeamsTheme.fix();
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
            var val = document.getElementById("data");
            microsoftTeams.settings.setSettings({
                contentUrl: "https://runarbot.azurewebsites.net/runarbotTabTab.html?data=" + val.value,
                customSettings: val.value,
                suggestedDisplayName: `runarbot`,
                removeUrl: "https://runarbot.azurewebsites.net/remove.html",
            });
            saveEvent.notifySuccess();
        });
    }
    setValidityState(val) {
        microsoftTeams.settings.setValidityState(val);
    }
}
exports.runarbotTabConfigure = runarbotTabConfigure;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const theme_1 = __webpack_require__(0);
/**
 * Implementation of the runarbot Tab content page
 */
class runarbotTabTab {
    /**
     * Constructor for runarbotTab that initializes the Microsoft Teams script and themes management
     */
    constructor() {
        microsoftTeams.initialize();
        theme_1.TeamsTheme.fix();
    }
    /**
     * Method to invoke on page to start processing
     * Add you custom implementation here
     */
    doStuff() {
        microsoftTeams.getContext((context) => {
            var a = document.getElementById('app');
            if (a) {
                a.innerHTML = `The value is: ${this.getParameterByName('data')}`;
            }
        });
    }
    /**
     * Method for retrieving query string parameters
     */
    getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return '';
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}
exports.runarbotTabTab = runarbotTabTab;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
});
//# sourceMappingURL=client.js.map