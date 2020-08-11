/* eslint-disable no-console */
import { createID } from './Mixins';

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
        'send-data-only': false,
    },
};

export default ( options ) => {
    
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
        }else{
            console.log('id=', id);
            console.error( "ID(data._id) is passed by message, but not found in callbacks!" );
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
            const id = msg[options['create-id']] = options['create-id-func'] === null ? 
                createID( Object.keys( callbacks ) ) : 
                options['create-id-func']( Object.keys( callbacks ) );
            
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
            console.log( "Send json: ", msg );
        webSocket.send( msg );

    }   

    return {
        send,
        sendAsync,
        fireCallback,
    };
};