var app = require('express')();
var http = require('http');
var config = require('./config');

var http = http.createServer();

var io = require('socket.io')(http);

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var port = process.env.PORT || config.port;

http.listen(port, function (error) {
    console.info("Listening on port %s. Open http://localhost:%s/ in your browser.", port, port)
});