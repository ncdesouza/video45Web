/**
 * Created by nicholas on 25/10/15.
 */
//var express = require('express');
//var apiRoutes = express.router();
var jwt = require('jsonwebtoken');

module.exports = function(app, passport) {
    app.post('/api/login',
        passport.authenticate('login'),
        function(req, res) {
            var payload = {username: req.user.username};
            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: 86400
            });

            res.json({
                success: true,
                message: 'Enjoy!',
                token: token
            });
        }
    );
};