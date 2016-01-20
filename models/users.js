var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    login: String, 
    pw: String, 
    firstName: String, 
    lastName: String, 
    phone: String, 
    email: String, 
    id: Number
});

var User = mongoose.model('User', UserSchema);

module.exports = User;