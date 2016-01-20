require('./db/connect');
var express = require('express');
var tournamentRoutes = require('./routes/tournament');
var app = express();

app.use(express.static('public'));

app.use('/', tournamentRoutes);
app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(8080, function() {
    console.log('Listening on port 8080');
});

exports.app = app;