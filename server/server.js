'use strict';
var express = require('express');
var io = require('socket.io');
var path = require("path");
var http = require('http');
var parser = require('./parser');

var app = express();
var server = http.createServer(app);
var socket = io.listen(server);

var appRoot = path.join(__dirname, 'www');

app.use(express.static(appRoot));
app.set('view engine', 'html');
app.get('/', function (req, res) {
  res.render('/www/index');
});
// console.log('processUrl',processUrl)
socket.on('connection', function(socket) {
console.log('new connection');

  socket.on('process', function(data) {
console.log('process!');
    parser(data, socket);
  });
});

server.listen(3000, function () {
  console.log('Server started on port 3000!');
});
