var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
    teamOne: String, 
    teamTwo: String, 
    winner: String, 
    loser: String, 
    teamOneScore: Number, 
    teamTwoScore: Number, 
    id: Number
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;