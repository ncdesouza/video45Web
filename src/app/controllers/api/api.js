/**
 * Created by nicholas on 25/10/15.
 */
var jwt = require('jsonwebtoken');

var server;

module.exports = function(app, passport) {
    server = app;

    require('./login')(app, passport);
    require('./signup')(app, passport);
    require('./home')(app, isValidUser);
    require('./public')(app, isValidUser);
    require('./github')(app, isValidUser);
    require('./comment')(app, isValidUser);
    require('./likes')(app, isValidUser)
    require('./profile')(app, isValidUser);


};

function isValidUser(req, res, next) {
    var token = req.headers.authorization || req.cookies.video45;
    jwt.verify(token, server.get('superSecret'), function(err, decoded) {
        if (err) return res.json({success: false, msg: 'Token failed', data: ''});
        req.decoded = decoded;
        next();
    });
}