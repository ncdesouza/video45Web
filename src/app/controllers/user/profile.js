var User = require('../../models/user');
var Video = require('../../models/video');
var Comment = require('../../models/comment');


module.exports = function(app, passport, isLoggedIn) {

    // =========================================================================
    // Profile =================================================================
    // =========================================================================
    app.get('/:username', isLoggedIn, function(req, res) {
        User.findOne({username: req.params.username}, function(err, user) {
            user.getVideos(function (err, user) {
                for (var i = 0; i < user.videos.length; i++) {
                    user.videos[i].liked = user.videos[i].likes.indexOf(req.user._id) > -1;
                }
                res.render('profile.jade', {
                    data: user
                });
            });
        });
    });


    // =========================================================================
    // Logout ==================================================================
    // =========================================================================
    app.get('/logout', function(request, response) {

        request.logout();
        response.redirect('/');

    });

};