# Async WebSocket for Vue
Send data to server using WebSocket and then wait for the response from the server to resume the function. The function returns a Promise with the data from server. *It wasn't tested yet!*

Main purpose I've created this:
JS:
```javascript
const response = await this.$websocket.sendAsync( { some:  'data'  } );
console.log( "Response:",  response.msg );
```
On server(PHP):
```php
$data = json_decode( $msg );
//Do something with the data and send back along with '_id'
$from->send( json_encode( [
	'_id'  =>  $data['_id'],
	'msg'  =>  'Send response back to the function'
] ) );
```

## Install
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://lbesson.mit-license.org/) [![Vue](https://img.shields.io/badge/Vue-^2.6.10-green.svg?style=for-the-badge)](https://vuejs.org/)


```
npm install vue-async-websocket --save
```

## Usage

Register Vue Plugin:
```javascript
import WebSocketVue from 'vue-async-websocket';

//Pass url as second argument, third argument is an optional options object
Vue.use( WebSocketVue, 'ws://localhost:8090', {} );

//Pass valid WebSocket object as second parameter
const webSocket = new WebSocket( 'ws://localhost:8090' );
Vue.use( WebSocketVue, webSocket );
```
### Options

You can pass an object with options to the *Vue.use()*.
```javascript
const defOptions = {
	'debug': false,
	
	'protocols': '',
	'load-on-start': false,
	
	'max-timeout': 5000,
	'reconnect': true,
	'max-reconnect-count': 4,
	'reconnect-delay': 2000,
	
	'create-id-func': null,
	
	'response-id': '_id',
	'response-type': '_type'
};
Vue.use( WebSocketVue, 'ws://localhost:8090', defOptions );
```
| Parameter		            | Value         |
| :-------------:           |---------------|
| **debug** 				| *Boolean*. Whether to display additional logs in console or not. |
| **protocols** 			| *String/Array*. Protocols for the WebSocket. |
| **load-on-start** 		| *Boolean*. Whether to automatically open connection, or manually. |
| **max-timeout** 			| *Integer*. How long to wait for response in _ms_. Can be overwritten by args in *send* function. |
| **reconnect** 			| *Boolean*. Whether to reconnect automatically when connection is closed or not. |
| **max-reconnect-count** 	| *Integer*. How many times to reconnect. |
| **reconnect-delay** 		| *Integer*. Time in *ms* to wait between each reconnect. |
| **create-id-func** 		| *Callable*. If you want to create different function for creating ID for callbacks, you can use this option. It takes an array of keys as an argument, and return a string. |
| **response-id** 			| *String*. If you want in your server code to use different name than '_id' you can specify it here. |
| **response-type** 		| *String*. If you want in your server code to use different name than '_type' you can specify it here. |
---
### Sending data
**sendAsync( data, args = {} )**
Sending data using sendAsync. It returns a *Promise*, so you can use *.then()* if you want. Server has to send a message back with '_id' property. Set 'response-id' option if you want to change '_id' to something else. 

```javascript
try{
	const response = await this.$websocket.sendAsync( { some: 'data' } );
	console.log( "Response:", response );
}catch( error ){
	console.error( error );
}
```
You can pass arguments object as the second parameter.
```javascript
const defaultArgs = {
	'parse-json':  true,
	'timeout':  true,
	'max-timeout':  -1,
	'hooks':  {
		'bad-websocket':  null,
		'timed-out':  null,
	},
	'callback':  {
		'send-data-only':  true,
	}
};
const response = await this.$websocket.sendAsync( { some: 'data' }, defaultArgs );
```
| Parameter		                 | Value         |
| :-------------:                  |---------------|
| **parse-json**                 | *Boolean*. Whether to parse data to JSON or not. |
| **timeout**                    | *Boolean*. If false, will wait forever for the response.      |
| **max-timeout**                | *Integer*. How long to wait for response in *ms*. If value is lower than 0, *'max-timeout' option* will be used.      |
| hooks[**'bad-websocket'**]     | *Callable*. Function that will be called when socket is null, or readyState != 1. This value is wrapped in *hooks* object.      |
| hooks[**'timed-out'**]         | *Callable*. Function that will be called when response didn't come. This value is wrapped in *hooks* object.     |
| callback[**'send-data-only'**] | *Boolean*. Whether to send only *event.data* as response, or the whole *MessageEvent*. This value is wrapped in *callback* object.   |

**send( data,  callback  =  null,  args  =  {} )**
If you don't want to use async function, you can use *send()* and pass a callback function. You don't need to pass the callback, so it will only send the data to server. 
The *args* object is the same as in asyncSend.
```javascript
this.$websocket.send( { some: 'data' } );
//Or with callback
this.$websocket.send( { some:  'data' }, ( data ) => {
	console.log( "Response: ", data );
} );
```
---
### Listeners
**Quick Example**
PHP code:
```php
$client->send( json_encode( [
	'_type' => 'some-type',
	'msg' => 'Send message with type "some-type" to client'
] ) );
```
JS code:
```javascript
//Call only for specific type
this.$websocket.addEventListener( 'some-type', ( data ) => {
	console.log( "Got message of type 'some-type': ", data );
} );
//Always call on message
this.$websocket.addEventListener( 'any', ( data ) => {
	console.log( "Got a message: ", data );
} );
//You can also use empty string '', it will work as 'any'
```

Run a function whenever a message comes from the server. The message has to have *'_type'* parameter set. If not, only functions with type *'any'* will be called. You can change *'_type'* to something else by setting *options['response-type']* when installing the Vue plugin(*Vue.use*).

**WebSocket messages - onopen, onclose, onerror**
```javascript
this.$websocket.addEventListener( 'onopen', ( data ) => {
	console.log( "Connection opened!", data );
} );
```
**removeEventListener**
When adding a listener, the function returns an *id*. You can use it, to remove the listener.
```javascript
const id = this.$websocket.addEventListener( 'some-type', ( data ) => {
	console.log( "Got message of type 'some-type': ", data );
	this.$websocket.removeEventListener( id );
} );
```
---
### TODO
Testing, Using Vuex, Examples