
module.exports = function(app, passport, isLoggedIn) {

    app.get('/connect', isLoggedIn, function(request, response) {
        response.render('connect.jade', {

            user : request.user // get user from session

        });

    });

    // =========================================================================
    // Facebook ================================================================
    // =========================================================================
    // route for facebook authentication and login
    app.get('/connect/facebook', passport.authenticate('facebook-link', {

        scope: ['email']

    }));

    // route to handle callback from facebook
    app.get('/connect/facebook/callback', passport.authenticate('facebook-link', {

        successRedirect: '/connect',
        failureRedirect: '/',
        failureFlash : true

    }));

    // route to unauthenticated facebook from user account
    app.get('/unlink/facebook', function (request, response) {

        var user = request.user;

        user.facebook.token = undefined;

        user.save(function (err) {

            response.redirect('/connect');

        })

    });


    // =========================================================================
    // Twitter =================================================================
    // =========================================================================
    // route for twitter authorization
    app.get('/connect/twitter', passport.authenticate('twitter-link', {
        failureRedirect: '/connect'
    }));

    // route to handle callback from twitter
    app.get('/connect/twitter/callback', passport.authenticate('twitter-link', {

        successRedirect : '/connect',
        failureRedirect : '/connect',
        failureFlash : true

    }));

    // route to unauthenticated twitter from user account
    app.get('/unlink/twitter', function(request, response) {

        var user = request.user;

        user.twitter.token = undefined;

        user.save(function(err) {

            response.redirect('/connect');

        })

    });


    // =========================================================================
    // Google  =================================================================
    // =========================================================================
    // route for twitter authorization
    app.get('/connect/google', passport.authenticate('google-link', {
        scope : ['profile', 'email']
    }));

    // route to handle callback from twitter
    app.get('/connect/google/callback', passport.authenticate('google-link', {

        successRedirect : '/connect',
        failureRedirect : '/connect',
        failureFlash : true

    }));

    // route to unauthenticated twitter from user account
    app.get('/unlink/google', function(request, response) {

        var user = request.user;

        user.google.token = undefined;

        user.save(function(err) {

            response.redirect('/connect');

        })

    });

};