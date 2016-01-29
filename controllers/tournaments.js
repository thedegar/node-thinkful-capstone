var Tournament = require('../services/tournaments');

exports.postTournament = function(req, res) {
    Tournament.save(req.body, function(tournament) {
        res.status(201).json(tournament);
        console.log("Tournament Created "+tournament);
    }, function(err) {
        res.status(400).json(err);
    });
};

exports.getList = function(req, res) {
    Tournament.list(function(tournaments) {
        res.json(tournaments);
        console.log("Tournament List Sent: "+tournaments);
    }, function(err) {
        res.status(400).json(err);
        console.log("Error");
    });
};