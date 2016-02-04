var User = require('../models/users');

exports.getOne = function(userid, callback, errback) {
    User.findOne({'login': userid}, function(err, user) {
        if (err) {
            errback(err);
            return;
        }
        callback(user);
    });
};