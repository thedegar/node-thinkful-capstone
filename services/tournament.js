var Tournament = require('../models/tournament');

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

/* not expected to work <<<<<<<
exports.delete = function(id, callback, errback) {
    Tournament.where().findOneAndRemove({_id: id}, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};

exports.update = function(id, name, callback, errback) {
    Tournament.findOneAndUpdate({_id:id},{name: name}, {new:true}, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};
*/