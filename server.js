require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var socket_io = require('socket.io');
var http = require('http');
var tournamentRoutes = require('./routes/tournaments');
//var userRoutes = require('./routes/users');
//var gameRoutes = require('./routes/games');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function (socket) {
    console.log('Client connected.  ID = '+socket.id);
});

server.listen(8080);

app.use('/', tournamentRoutes);
app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
});

//app.listen(8080, function() {
//    console.log('Listening on port 8080');
//});

exports.app = app;