User = require('../../models/user');
Video = require('../../models/video');
Comment = require('../../models/comment');


module.exports = function(app, passport, isLoggedIn) {

    // =========================================================================
    // Profile =================================================================
    // =========================================================================
    app.get('/profile', isLoggedIn, function(request, response) {
        User
            .findOne({ email: request.user.email })
            .exec(function(err, user) {
                if (err) return console.log(err);
                user.getVideos(function(err, videos) {
                    console.log(videos);
                    response.render('profile.jade', {
                        videos : videos // get user from session
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