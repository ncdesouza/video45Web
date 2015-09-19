// app/routes/auth.js

module.exports = function(app, passport, nev) {

    // =========================================================================
    // Signup ==================================================================
    // =========================================================================
    app.get('/signup', function(request, response) {

        // render signup page and pass data if exists
        response.render('signup.ejs', {message: request.flash('signupMessage')});

    });


    app.get('/setup', function(request, response) {

        //

    });

    // process the sign up form
    app.post('/signup', passport.authenticate('video45-signup', {

        successRedirect : '/profile', // redirect to profile
        failureRedirect : '/signup', // redirect to signup
        failureFlash : true

    }));

};