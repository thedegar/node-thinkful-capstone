var Tournament = require('../models/tournaments');

//Here are the db.routes or functions
exports.save = function(tournament_object, callback, errback) {
    Tournament.create(tournament_object, function(err, tournament) {
        if (err) {
            errback(err);
            return;
        }
        callback(tournament);
    });
};

exports.list = function(callback, errback) {
    Tournament.find(function(err, tournaments) {
        if (err) {
            errback(err);
            return;
        }
        callback(tournaments);
    });
};

exports.delete = function(callback, errback) {
    Tournament.remove( {} , function(err, tournaments) {
        if (err) {
            errback(err);
            return;
        }
        callback(tournaments);
    });
};

exports.getOne = function(id, callback, errback) {
    Tournament.findOne({'_id': id}, function(err, tournament) {
        if (err) {
            errback(err);
            return;
        }
        callback(tournament);
    });
};

exports.deleteOne = function(id, callback, errback) {
    Tournament.findOneAndRemove({'_id': id}, function(err, tournament) {
        if (err) {
            errback(err);
            return;
        }
        callback(tournament);
    });
};

exports.updateOne = function(id, tournament_object, callback, errback) {
    Tournament.findOneAndUpdate({_id:id},tournament_object, {new:true, upsert:true}, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};