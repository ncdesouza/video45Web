

var async = require('async');

module.exports = function(app, isLoggedIn) {

    app.get('/home', isLoggedIn, function(req, res) {


        res.render('home', { videos: req.user });

    });


};