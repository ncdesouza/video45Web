// app/routes/auth.js
var videos = [
    '/public/vid/dock.mp4',
    '/public/vid/frontier.mp4',
    '/public/vid/river.mp4'
];


module.exports = function(app, passport) {

    // =========================================================================
    // Sign up ==================================================================
    // =========================================================================
    app.get('/signup', function(request, response) {
        var videoPaths = JSON.stringify(videos);
        // render signup page and pass data if exists
        response.render('signup', {message: request.flash('signupMessage'), videoPath: videoPaths});

    });


    // process the sign up form
    app.post('/signup', passport.authenticate('signup', {

        successRedirect : '/setup', // redirect to profile
        failureRedirect : '/', // redirect to sign up
        failureFlash : true

    }));


    // =========================================================================
    // Facebook ================================================================
    // =========================================================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook-auth', {

        scope : ['email']

    }));

    // route to handle callback from facebook
    app.get('/auth/facebook/callback', passport.authenticate('facebook-auth', {

            successRedirect : '/setup',
            failureRedirect : '/'

    }));


    // =========================================================================
    // Twitter =================================================================
    // =========================================================================
    // route for twitter authorization
    app.get('/auth/twitter', passport.authenticate('twitter', {

        successRedirect: '/setup',
        failureRedirect: '/'

    }));

    // route to handle callback from twitter
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {

        successRedirect : '/profile',
        failureRedirect : '/'

    }));


    // =========================================================================
    // Google  =================================================================
    // =========================================================================
    // route for twitter authorization
    app.get('/auth/google', passport.authenticate('google', {

        scope : ['profile', 'email']

    }));

    // route to handle callback from twitter
    app.get('/auth/google/callback', passport.authenticate('google', {

        successRedirect : '/setup',
        failureRedirect : '/'

    }));

};