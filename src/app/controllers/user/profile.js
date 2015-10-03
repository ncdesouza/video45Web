User = require('../../models/user');
Video = require('../../models/video');
Comment = require('../../models/comment');


module.exports = function(app, passport, isLoggedIn) {

    // =========================================================================
    // Profile =================================================================
    // =========================================================================
    app.get('/profile', isLoggedIn, function(request, response) {
        User.findOne({ email: request.user.email })
            .populate('videos.author')
            .exec(function(err, user) {
                if (err) return console.log(err);
                console.log(user);
            });



        response.render('profile.jade', {

            user : request.user // get user from session

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