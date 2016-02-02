var Tournament = require('../services/tournaments');

exports.postTournament = function(req, res) {
    Tournament.save(req.body, function(tournament) {
        res.status(201).json(tournament);
        console.log("Tournament Created "+tournament._id);
    }, function(err) {
        res.status(400).json(err);
    });
};

exports.getList = function(req, res) {
    Tournament.list(function(tournaments) {
        res.json(tournaments);
        console.log("Tournament List Sent: "+tournaments.length+" Total");
    }, function(err) {
        res.status(400).json(err);
    });
};

exports.deleteTournaments = function(req, res) {
    Tournament.delete(function(tournaments) {
        res.status(200).json(tournaments);
        console.log("Tournaments Deleted");
    }, function(err) {
        res.status(400).json(err);
    });
};

exports.getTournament = function(req, res) {
    var id = req.params.id;
    Tournament.getOne(id, function(tournament) {
        res.json(tournament);
        console.log("Tournament ID="+tournament._id+" sent");
    }, function(err) {
        res.status(400).json(err);
    });
};