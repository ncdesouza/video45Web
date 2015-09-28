

module.exports = function(app, passport) {

    require('./setup')(app, passport, isLoggedIn);
    require('./profile')(app, passport, isLoggedIn);
    require('./connect')(app, passport, isLoggedIn);


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