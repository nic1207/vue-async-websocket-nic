module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "e2c3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "5e2d":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "e2c3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: C:/Users/ho6ken/AppData/Roaming/npm/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("5e2d")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/Mixins.js

const createObjID = function( keys ){
  let random = "";
  do {
    random = Math.random().toString(36).substring(2, 7);
  } while(random == "" || keys.indexOf(random) != -1);
  return random;
}

let sid = 0
const createAutoID = function (keys) {
  sid++
  return sid
}
// CONCATENATED MODULE: ./src/Listeners.js
/* eslint-disable no-console */


/* harmony default export */ var Listeners = (() => {
    const listeners = {};
    const fireListeners = ( type, data ) => {
        console.log('fireListeners(type=',type, 'data=', data, ')');
        Object.keys( listeners ).forEach( key => {
            const listener = listeners[key];
            if( listener.type.toLowerCase() === 'any' || 
                listener.type === type ){
                    listener.callback( data );
                }
        } );
    };
    const addEventListener = ( type, callback ) => {
        const id = createObjID( Object.keys( listeners ) );
        console.log('addEventListener(id=', id, ')');
        listeners[id] = { 
            type: type === '' ? 'any' : type, 
            callback 
        };
        return id;
    };
    const removeEventListener = ( id ) => {
        console.log('removeEventListener(id=', id, ')');
        if( !( id in listeners ) ){
            return false;
        }
        delete listeners[id];
        return true;
    };

    return {
        fireListeners,
        addEventListener,
        removeEventListener,
    };
});
// CONCATENATED MODULE: ./src/Send.js
/* eslint-disable no-console */


const defSendArgs = {
    //Send
    'parse-json': true,

    //Timeouts
    'timeout': true,
    'max-timeout': -1,

    //Hooks
    'hooks': {
        'bad-websocket': null,
        'timed-out': null,
    },

    //Calbacks args
    'callback': {
        'send-data-only': true,
    },
};

/* harmony default export */ var Send = (( options ) => {
    
    const callbacks = {};

    const fireCallback = ( id ) => {
        console.log('fireCallback(', id, ')')
        console.log('callbacks=', callbacks)
        if( id in callbacks ){
            callbacks[ id ]['callback']( 
                callbacks[ id ]['options']['send-data-only'] === true ? 
                JSON.parse( event.data ) :
                event 
            );
            if( 'timeout' in callbacks[ id ] )
                clearTimeout( callbacks[ id ]['timeout'] );
            //
            delete callbacks[ id ];
            return true;
        }else{
            console.log('id=', id);
            console.error( "ID(data._id) is passed by message, but not found in callbacks!" );
            return false;
        }
    }

    const sendAsync = ( webSocket, data, args = {} ) => {
        return new Promise( ( resolve, reject ) => {
            send( webSocket, data, ( data ) => {
                resolve( data );
            }, {
                ...args,
                'hooks': {
                    'bad-websocket': () => { reject( 'Cannot send, as webSocket is null or not connected!' ); },
                    'timed-out': ( timeout ) => { reject( `No answer after ${timeout}ms!` ); },
                }
            } );
        } );
    };
    const send = ( webSocket, data, callback = null, args = {} ) => {
        args = { ...defSendArgs, ...args };

        if( webSocket === null || webSocket.readyState != 1 ){
            if( args['hooks']['bad-websocket'] !== null )
                args['hooks']['bad-websocket']();
            else
                throw "Cannot send, as webSocket is null or not connected!";
            return;
        }

        let msg = data;

        if( callback !== null ){
            const id = msg[options['create-id']] = options['create-autoid-func'] === true ? 
                createAutoID( Object.keys( callbacks ) ) : 
                createObjID( Object.keys( callbacks ) );
            
            callbacks[ id ] = {};
            callbacks[ id ]['options'] = args['callback'];
            callbacks[ id ]['callback'] = callback;
            
            if( args['timeout'] === true ){ 
                const timeout = args['max-timeout'] > 0 ? args['max-timeout'] : options['max-timeout'];
                callbacks[ id ]['timeout'] = setTimeout( () => {
                    clearTimeout( callbacks[ id ]['timeout'] );
                    delete callbacks[ id ];

                    if( args['hooks']['timed-out'] !== null )
                        args['hooks']['timed-out']( timeout );
                    else
                        throw `No answer after ${timeout}ms!`;
                }, timeout );
            }
        }
        
        if( args['parse-json'] === true )
            msg = JSON.stringify( msg );
        //

        if( options['debug'] === true )
            console.log( "[debug] Send json: ", msg );
        webSocket.send( msg );

    }   

    return {
        send,
        sendAsync,
        fireCallback,
    };
});
// CONCATENATED MODULE: ./src/WebSocket.js
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unreachable */





const defOptions = {
    'debug': true,
    
    'protocols': '',
    'load-on-start': false,
    
    'max-timeout': 5000,

    'reconnect': true,
    'max-reconnect-count': 4,
    'reconnect-delay': 2000,

    'create-autoid-func': null,

    'response-id': 'SN'
};

const webSocketPlugin = {};
webSocketPlugin.install = function( Vue, url, options = {} ){
    console.log('webSocketPlugin.install(url=', url, 'options=', options, ')')
    if( typeof url === 'undefined' || url === null ){
        throw 'URL is not set';
    }

    let webSocket = null;
    options = { ...defOptions, ...options };

    const send = Send( options );
    const listener = Listeners();


    let reconnectCount = 0;
    let reconnectTimeout = null;

    const open = () => {
        console.log('open()');
        if( webSocket !== null )
            return false;
        if( options['debug'] === true )
            console.log( "[debug] Starting WebSocket on url: " + url );
        webSocket = new WebSocket(url);
        registerEvents();
    }
    const close = () => {
        console.log('open()');
        if( webSocket === null )
            return false;
        if( options['debug'] === true )
            console.log( "[debug] Close connection" );
        webSocket.close();
    };
    const reconnect = () => {
        console.log('reconnect()');
        if( reconnectCount < options['max-reconnect-count'] ){

            reconnectTimeout = setTimeout( () => {
                ++reconnectCount;
                
                webSocket = null;
                open();

            }, options['reconnect-delay'] );
            
        }else{
            console.error( `Couldn't reconnect after ${reconnectCount} times.` );
        }
    };
    const registerEvents = () => {
        console.log('registerEvents()');
        webSocket.onopen = event => {
            if( options['debug'] === true )
                console.log( "[debug] Websocket Connection opened!" );
            
            reconnectCount = 0;
            clearTimeout( reconnectTimeout );

            listener.fireListeners( 'onopen', event );
        };

        webSocket.onclose = event => {
            if( options['reconnect'] === true )
                reconnect();
            listener.fireListeners( 'onclose', event );
        };

        webSocket.onerror = event => {
            listener.fireListeners( 'onerror', event );
        };
        
        webSocket.onmessage = event => {
            console.log('webSocket.onmessage()');
            if( options['debug'] === true )
                console.log( "[debug] Message: event=", event );
            
            const data = JSON.parse( event.data );
            if( options['response-id'] in data ){
                var result = send.fireCallback( data[ options['response-id'] ] );
                console.log('fireCallback(result=', result, ')');
                if(result)
                    return;
            }

            // type = data[ options['response-type'] ] || 'any';
            //listener.fireListeners( type, data );
            listener.fireListeners( 'onmessage', data );
        };

    }


    if( typeof url === 'object' ){
        webSocket = url;
        url = webSocket.url;
        registerEvents();
    }else if( webSocket === null && options['load-on-start'] === true ){
        open();
    }

    Vue.prototype.$websocket = {
        getReadyState: () => { return webSocket.readyState },

        sendAsync: ( data, args = {} ) => send.sendAsync( webSocket, data, args ),
        send: ( data, callback = null, args = {} ) => send.send( webSocket, data, callback, args ),

        open,
        close,

        addEventListener: listener.addEventListener,
        removeEventListener: listener.removeEventListener,
    };
};

/* harmony default export */ var src_WebSocket = (webSocketPlugin);
// CONCATENATED MODULE: C:/Users/ho6ken/AppData/Roaming/npm/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_WebSocket);



/***/ })

/******/ });
//# sourceMappingURL=vue-async-websocket-nic.common.js.map