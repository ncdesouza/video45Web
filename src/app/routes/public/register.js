// app/routes/auth.js

module.exports = function(app, passport, nev) {

    // =========================================================================
    // Sign up ==================================================================
    // =========================================================================
    app.get('/signup', function(request, response) {

        // render signup page and pass data if exists
        response.render('signup.ejs', {message: request.flash('signupMessage')});

    });


    // process the sign up form
    app.post('/signup', passport.authenticate('signup', {

        successRedirect : '/profile', // redirect to profile
        failureRedirect : '/signup', // redirect to signup
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

            successRedirect : '/profile',
            failureRedirect : '/'

    }));


    // =========================================================================
    // Twitter =================================================================
    // =========================================================================
    // route for twitter authorization
    app.get('/auth/twitter', passport.authenticate('twitter', {

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

        successRedirect : '/profile',
        failureRedirect : '/'

    }));

};