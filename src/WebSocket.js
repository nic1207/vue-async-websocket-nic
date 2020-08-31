/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unreachable */
import { createObjID, createAutoID } from './Mixins';
import Listeners from './Listeners';
import Send from './Send';


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

export default webSocketPlugin;