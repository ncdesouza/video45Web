
var User = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function(nodemailer) {
    nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: configAuth.gmail.email,
            pass: configAuth.gmail.password
        }
    });
};