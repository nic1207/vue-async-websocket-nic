/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unreachable */
import { createID } from './Mixins';
import Listeners from './Listeners';
import Send from './Send';


const defOptions = {
    'debug': false,
    
    'protocols': '',
    'load-on-start': false,
    
    'max-timeout': 5000,

    'reconnect': true,
    'max-reconnect-count': 4,
    'reconnect-delay': 2000,

    'create-id-func': null,

    'response-id': 'SM',
    'response-type': '_type',
};

const webSocketPlugin = {};
webSocketPlugin.install = function( Vue, url, options = {} ){

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
        if( webSocket !== null )
            return false;
        if( options['debug'] === true )
            console.log( "Starting WebSocket on url: " + url );
        webSocket = new WebSocket( url, options['protocols'] );
        registerEvents();
    }
    const close = () => {
        if( webSocket === null )
            return false;
        if( options['debug'] === true )
            console.log( "Close connection" );
        webSocket.close();
    };
    const reconnect = () => {
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

        webSocket.onopen = event => {
            if( options['debug'] === true )
                console.log( "Connection opened!" );
            
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
            if( options['debug'] === true )
                console.log( "Message: ", event );
            
            const data = JSON.parse( event.data );
            if( options['response-id'] in data ){
                send.fireCallback( data[ options['response-id'] ] );
                return;
            }

            const type = data[ options['response-type'] ] || 'any';
            listener.fireListeners( type, data );
        };

    }


    if( typeof url === 'object' ){
        webSocket = url;
        url = webSocket.url;
        registerEvents();
    }else if( webSocket === null && options['load-on-start'] === false ){
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

export default webSocketPlugin;