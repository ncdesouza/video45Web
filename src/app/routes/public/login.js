var videos = [
    'dock.mp4',
    'frontier.mp4',
    'river.mp4'
];

/**
 * Created by nicholas on 19/09/15.
 */
module.exports = function(app, passport) {

    // =========================================================================
    // Video 45 ================================================================
    // =========================================================================

    // index ===================================================================
    app.get('/', function(request, response) {

        var video = videos[Math.floor(Math.random()*videos.length)];
        response.render('index.ejs', {message: request.flash('loginMessage'), videoPath: '/public/vid/'+video});

    });

    app.post('/', passport.authenticate('login', {

        successRedirect : '/profile', // redirect to profile
        failureRedirect : '/', // redirect to login
        failureFlash : true

    }));

    // Login ===================================================================
    app.get('/login', function(request, response) {

        response.render('index.ejs', {message: request.flash('loginMessage')});

    });

    // process the login form
    app.post('/login', passport.authenticate('login', {

        successRedirect : '/profile', // redirect to profile
        failureRedirect : '/', // redirect to login
        failureFlash : true

    }));


    // =========================================================================
    // Facebook ================================================================
    // =========================================================================

    // route for facebook login
    app.get('/login/facebook', passport.authenticate('facebook-login', {

        scope: ['email']

    }));

    // route to handle callback from facebook
    app.get('/login/facebook/callback', passport.authenticate('facebook-login', {

        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash : true

    }));


    // =========================================================================
    // Twitter =================================================================
    // =========================================================================

    // route for twitter login
    app.get('/login/twitter', passport.authenticate('twitter-login', {

        failureRedirect: '/'

    }));

    // route to handle login callback from twitter
    app.get('/login/twitter/callback', passport.authenticate('twitter-login', {

        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true

    }));


    // =========================================================================
    // Google  =================================================================
    // =========================================================================

    // route for twitter login
    app.get('/login/google', passport.authenticate('google-login', {

        scope : ['profile', 'email']

    }));

    // route to handle login callback from twitter
    app.get('/login/google/callback', passport.authenticate('google-login', {

        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true

    }));

};