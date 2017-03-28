/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("botbuilder");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Express = __webpack_require__(5);
const bodyParser = __webpack_require__(4);
const http = __webpack_require__(6);
const path = __webpack_require__(8);
const morgan = __webpack_require__(7);
const builder = __webpack_require__(0);
const runarbotBot_1 = __webpack_require__(2);
const runarbotCustomBot_1 = __webpack_require__(3);
let express = Express();
let port = process.env.port || process.env.PORT || 3007;
express.use(bodyParser.json());
express.use(morgan('tiny'));
express.use('/scripts', Express.static(path.join(__dirname, 'web/scripts')));
express.use('/assets', Express.static(path.join(__dirname, 'web/assets')));
// Bot hosting 
let botSettings = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};
let bot = new runarbotBot_1.runarbotBot(new builder.ChatConnector(botSettings));
express.post('/api/messages', bot.Connector.listen());
// Custom bot
let customBot = new runarbotCustomBot_1.runarbotCustomBot();
express.post('/api/customBot', customBot.requestHandler);
// This is used to prevent your tabs from being embedded in other systems than Microsoft Teams
express.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com");
    res.setHeader("X-Frame-Options", "ALLOW-FROM https://teams.microsoft.com/."); // IE11
    return next();
});
// Tabs (protected by the above)
express.use('/\*Tab.html', (req, res, next) => {
    res.sendFile(path.join(__dirname, `web${req.path}`));
});
express.use('/\*Config.html', (req, res, next) => {
    res.sendFile(path.join(__dirname, `web${req.path}`));
});
express.use('/\*Remove.html', (req, res, next) => {
    res.sendFile(path.join(__dirname, `web${req.path}`));
});
// Fallback
express.use(function (req, res, next) {
    res.removeHeader("Content-Security-Policy");
    res.removeHeader("X-Frame-Options"); // IE11
    return next();
});
express.use('/', Express.static(path.join(__dirname, 'web/'), {
    index: 'index.html'
}));
express.set('port', port);
http.createServer(express).listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server running on ${port}`);
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const builder = __webpack_require__(0);
/**
 * Implementation for runarbot Bot
 */
class runarbotBot {
    /**
     * The constructor
     * @param connector
     */
    constructor(connector) {
        this.Connector = connector;
        this.universalBot = new builder.UniversalBot(this.Connector);
        // Add dialogs here
        this.universalBot.dialog('/', this.defaultDialog);
        this.universalBot.dialog('/help', this.helpDialog);
    }
    /**
     * This is the default dialog used by the bot
     * @param session
     */
    defaultDialog(session) {
        let text = runarbotBot.extractTextFromMessage(session.message);
        if (text.startsWith('hello')) {
            session.send('Oh, hello to you as well!');
            return;
        }
        else if (text.startsWith('help')) {
            session.beginDialog('/help');
            return;
        }
        session.send('I\'m terrible sorry, but my master hasn\'t trained me yet to do something...');
    }
    /**
     * This is the help dialog of the bot
     * @param session
     */
    helpDialog(session) {
        session.send('I\'m just your friendly bot, and right now I don\'t hanve any valuable help for you!');
    }
    /**
     * Extracts text only from messages, removing all entity references
     * @param message builder.IMessage
     */
    static extractTextFromMessage(message) {
        var s = message.text;
        message.entities.forEach((ent) => {
            s = s.replace(ent.text, '');
        });
        return s.trim();
    }
}
exports.runarbotBot = runarbotBot;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const builder = __webpack_require__(0);
/**
 * Implementation for runarbot Custom Bot
 */
class runarbotCustomBot {
    /**
     * The constructor
     */
    constructor() {
    }
    /**
     * Implement your bot logic here
     * @param req the Request
     * @param res the Response
     * @param next
     */
    requestHandler(req, res, next) {
        // parse the incoming message
        var incoming = req.body;
        // create the response, any Teams compatible responses can be used
        var message = new builder.Message();
        message.text(`Echo ${incoming.text}`);
        // send the message
        res.send(message.toMessage());
    }
}
exports.runarbotCustomBot = runarbotCustomBot;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map