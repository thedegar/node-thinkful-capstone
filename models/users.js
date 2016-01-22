var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    login: String, 
    password: String, 
    firstName: String, 
    lastName: String, 
    phone: String, 
    email: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;