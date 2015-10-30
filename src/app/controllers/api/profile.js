var jwt = require('jsonwebtoken');
var User = require('../../models/user');


module.exports = function (app) {
    app.get('/api/profile', function (req, res) {
        //var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var token = req.headers.authorization;

        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) return res.json({success: false, msg: 'Failed token', data: ''});

            User.findOne({username: decoded.username}, function(err, user) {
                user.getVideos(function (err, user) {
                    for (var i = 0; i < user.videos.length; i++) {
                        user.videos[i].liked = user.videos[i].likes.indexOf(req.user._id) > -1;
                    }
                    res.json({success: true, msg: 'User Profile', data: user});
                });
            });
        });

    });
}