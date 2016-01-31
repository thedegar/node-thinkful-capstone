var mongoose = require('mongoose');

var TournamentSchema = new mongoose.Schema({
    name: String, 
    bracketType: String, 
    teams: [String], 
    date: Date,
    location: String, 
    startTime: Number, 
    sport: String, 
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    password: String, 
    gameLength: Number, 
    fieldCount: Number, 
    fieldNames: [String],
    officials: [String], 
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

var Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;