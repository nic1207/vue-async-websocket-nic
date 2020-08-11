/* eslint-disable no-console */
import { createID } from './Mixins';

export default () => {
    const listeners = {};
    const fireListeners = ( type, data ) => {
        Object.keys( listeners ).forEach( key => {
            const listener = listeners[key];
            if( listener.type.toLowerCase() === 'any' || 
                listener.type === type ){
                    listener.callback( data );
                }
        } );
    };
    const addEventListener = ( type, callback ) => {
        const id = createID( Object.keys( listeners ) );
        listeners[id] = { 
            type: type === '' ? 'any' : type, 
            callback 
        };
        return id;
    };
    const removeEventListener = ( id ) => {
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
};