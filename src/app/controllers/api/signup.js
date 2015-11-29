/**
 * Created by nicholas on 29/10/15.
 */

var jwt = require('jsonwebtoken');


module.exports = function(app, passport) {

    app.post('/api/signup',
        passport.authenticate('signup', {session: false}),
        function(req, res)  {
            var payload = {username: req.user.username};
            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: 86400
            });
            res.json({
                success: true,
                message: 'New User created!',
                token: token
            });
        }
    );
};