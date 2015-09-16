// app/routes.js

module.exports = function(app, passport) {


    // =========================================================================
    // Home ====================================================================
    // =========================================================================
    app.get('/', function(request, response) {

        response.render('index.ejs'); // load index.ejs template

    });


    // =========================================================================
    // Login ===================================================================
    // =========================================================================
    app.get('/login', function(request, response) {

        response.render('login.ejs', {message: request.flash('loginMessage')});

    });

    // process the login form
    app.post('/login', passport.authenticate('video45-login', {

        successRedirect : '/profile', // redirect to profile
        failureRedirect : '/login', // redirect to login
        failureFlash : true

    }));


    // =========================================================================
    // Signup ==================================================================
    // =========================================================================
    app.get('/signup', function(request, response) {

        // render signup page and pass data if exists
        response.render('signup.ejs', {message: request.flash('signupMessage')});

    });

    // process the sigup form
    app.post('/signup', passport.authenticate('video45-signup', {

        successRedirect : '/profile', // redirect to profile
        failureRedirect : '/signup', // redirect to signup
        failureFlash : true

    }));


    // =========================================================================
    // Social Networks =========================================================
    // =========================================================================

    app.get('/connect', isLoggedIn, function(request, response) {
        response.render('connect.ejs', {

            user : request.user // get user from session

        });

    });

    // Facebook ================================================================
    // route for facebook authentication and login
    app.get('/connect/facebook', passport.authenticate('facebook', {

            scope : ['email']

        }));

    // route to handle callback from facebook
    app.get('/connect/facebook/callback', passport.authenticate('facebook', {

            successRedirect : '/connect',
            failureRedirect : '/connect'

        })
    );

    // route to unauthenticated facebook from user account
    app.get('/unlink/facebook', function(request, response) {

        var user = request.user;

        user.facebook.token = undefined;

        user.save(function(err) {

            response.redirect('/connect');

        })

    });


    // Twitter =================================================================
    // route for twitter authorization
    app.get('/connect/twitter', passport.authenticate('twitter', {
        failureRedirect: '/connect'
        }));

    // route to handle callback from twitter
    app.get('/connect/twitter/callback', passport.authenticate('twitter', {

        successRedirect : '/connect',
        failureRedirect : '/connect'

    }));

    // route to unauthenticated twitter from user account
    app.get('/unlink/twitter', function(request, response) {

        var user = request.user;

        user.twitter.token = undefined;

        user.save(function(err) {

            response.redirect('/connect');

        })

    });


    // Google  =================================================================
    // route for twitter authorization
    app.get('/connect/google', passport.authenticate('google', {
        scope : ['profile', 'email']
    }));

    // route to handle callback from twitter
    app.get('/connect/google/callback', passport.authenticate('google', {

        successRedirect : '/connect',
        failureRedirect : '/connect'

    }));

    // route to unauthenticated twitter from user account
    app.get('/unlink/google', function(request, response) {

        var user = request.user;

        user.google.token = undefined;

        user.save(function(err) {

            response.redirect('/connect');

        })

    });

    // =========================================================================
    // Profile =================================================================
    // =========================================================================
    app.get('/profile', isLoggedIn, function(request, response) {

        response.render('profile.ejs', {

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

// Authentication Validator
function isLoggedIn(request, response, next) {

    // if user is authenticated
    if (request.isAuthenticated()) {

        return next();

    }

    // if user is not authenticated
    response.redirect('/');
}