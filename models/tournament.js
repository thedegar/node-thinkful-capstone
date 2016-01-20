var mongoose = require('mongoose');

var TournamentSchema = new mongoose.Schema({
    name: String, 
    bracket_type: String, 
    teams: Array, 
    date: Date, 
    id: Number, 
    location: String, 
    time: Number, 
    sport: String, 
    director: String, 
    password: String, 
    game_length: Number, 
    field_count: Number, 
    field_names: Array,
    officials: Array
});

var Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;