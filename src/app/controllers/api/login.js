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
            var token = jwt.sign(req.user, app.get('superSecret'), {
                expiresIn: 86400
            });

            res.json({
                success: true,
                message: 'Enjoy!',
                token: token
            });
        }
    );

    app.post('/api/test', function (req, res) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) return res.json({success: false, msg: 'Failed token'});
            else req.decoded = decoded;

            console.log(decoded);
            res.json(decoded);
        });
    });
};