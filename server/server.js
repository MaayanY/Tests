'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let amqp = require('amqp');

let conOptions = {
	host: 'localhost'
};

let rabbitMq = amqp.createConnection(conOptions);
let rabbitExchange;



rabbitMq.on('ready', () => {
    rabbitExchange = rabbitMq.exchange('messages', {'type': 'fanout'});
});

io.on('connection', (socket) => {
	console.log('user connected');
	rabbitMq.queue('messages-q',{exclusive: true}, function (q){
		q.bind('messages', '');	
		q.subscribe((message) => {
		 	console.log(message);
		 	socket.broadcast.emit('message', {type:'new-message', text: message.text}); 
		 	
		});
	});
	socket.on('add-message', (message) => {
		
		rabbitExchange.publish('', {text: message.toString()})
		//socket.broadcast.emit('message', {type:'new-message', text: message});
	});
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	});

});



http.listen(3000, () => {
  console.log('started on port 3000');
});


