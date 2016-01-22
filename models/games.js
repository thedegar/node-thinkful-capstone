var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
    teamOne: String, 
    teamTwo: String, 
    winner: String, 
    loser: String, 
    teamOneScore: Number, 
    teamTwoScore: Number,
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;