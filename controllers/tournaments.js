var Tournament = require('../services/tournaments');

exports.postItem = function(req, res) {
    Tournament.save(req.body, function(tournament) {
        res.status(201).json(tournament);
        console.log("Tournament Created "+tournament._id);
    }, function(err) {
        res.status(400).json(err);
    });
};