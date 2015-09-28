


module.exports = function(app, passport, isLoggedIn) {

    // =========================================================================
    // Profile =================================================================
    // =========================================================================
    app.get('/profile', isLoggedIn, function(request, response) {

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