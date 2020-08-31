/* eslint-disable no-console */
import { createObjID, createAutoID } from './Mixins';

export default () => {
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
};