// config/passport.js

// load dependencies
var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var TwitterStrategy     = require('passport-twitter').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;

// load User model
var User = require('../app/models/user');

// load auth variables
var configAuth = require('./auth');


module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    passport.deserializeUser(function(id, done) {

       User.findById(id, function(err, user) {

           done(err, user);

       });

    });


    // =========================================================================
    // video45 signup ==========================================================
    // =========================================================================
    passport.use('video45-signup', new LocalStrategy({

        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true

    }, function(request, email, password, done) {
        process.nextTick(function() {

            User.findOne({ 'video45.email' : email }, function(err, user) {

                // return errors
                if (err)
                    return done(err);

                // validate username does not exist
                if (user) {

                    return done(null, false, request.flash('signupMessage',
                        'Email already registered'));

                } else {

                    var newUser = new User();

                    // set user credentials
                    newUser.video45.email = email;
                    newUser.video45.password = newUser.generateHash(password);

                    // save new user
                    newUser.save(function(err) {

                        if (err){

                            throw err;

                        }

                        return done(null, newUser);

                    });

                }

            });

        });

    }));


    // =========================================================================
    // video45 login ===========================================================
    // =========================================================================
    passport.use('video45-login', new LocalStrategy({

            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true

        }, function(request, email, password, done) {

            User.findOne({ 'video45.email' : email } , function(err, user) {

                // if errors, return the errors
                if (err) {

                    return done(err);

                }

                // if user not found or invalid password
                if (!user || !user.validPassword(password)) {

                    return done(null, false, request.flash('loginMessage',
                        'Incorrect email or password'));

                }

                // User and password match, return success
                return done(null, user);

            });

    }));


    // =========================================================================
    // Facebook ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID            : configAuth.facebookAuth.clientID,
            clientSecret        : configAuth.facebookAuth.clientSecret,
            callbackURL         : configAuth.facebookAuth.callbackURL,
            profileFields       : ['emails', 'displayName'],
            passReqToCallback   : true

        },

        // facebook will send back the token and profile
        function(request, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {


                if (!request.user) { // check if user is already logged in

                    // search database for user by facebook id
                    User.findOne({'facebook.id': profile.id}, function (err, user) {

                        // if search error
                        if (err) {

                            // return error
                            return done(err);

                        }

                        if (user) { // if the user is found

                            if (!user.facebook.token) {

                                // relink facebook with user
                                return addFacebook(user, profile, token, done);

                            }

                            // return user to session
                            return done(null, user);

                        } else { // if not user is found

                            // create new user with facebook credentials
                            return addFacebook(new User(), profile, token, done);

                        }

                    });

                } else { // user exists and logged in

                    // add facebook credentials to user account
                    return addFacebook(request.user, profile, token, done);

                }

            });

        }));


    // =========================================================================
    // Twitter =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey         : configAuth.twitterAuth.consumerKey,
        consumerSecret      : configAuth.twitterAuth.consumerSecret,
        callbackURL         : configAuth.twitterAuth.callbackURL,
        passReqToCallback   : true

    },

    function(request, token, tokenSecret, profile, done) {

        process.nextTick(function() {

            if (!request.user) {

                User.findOne({'twitter.id': profile.id}, function (err, user) {

                    if (err) { // if error
                        return done(err);
                    }

                    if (user) { // if user is found

                        if (!user.twitter.token) { // if user exists but was unlinked

                            // add the twitter credentials to user account
                            return addTwitter(user, profile, token, done)

                        }

                        return done(null, user); // pass user to session

                    } else { // if no user is found

                        // create a new user and add pass the user to session
                        return addTwitter(new User(), profile, token, done)

                    }

                });

            } else { // if user is logged in

                // link twitter account to current user account
                return addTwitter(request.user, profile, token, done)

            }
        });
    }));


    // =========================================================================
    // Google ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID            : configAuth.googleAuth.clientID,
        clientSecret        : configAuth.googleAuth.clientSecret,
        callbackURL         : configAuth.googleAuth.callbackURL,
        passReqToCallback   : true

    },
    function(request, token, refreshToken, profile, done) {

        process.nextTick(function() {

            if (!request.user) { // if user is not logged in

                User.findOne({'google.id': profile.id}, function (err, user) {

                    if (err) { // if error

                        return done(err);

                    }

                    if (user) { // if user is found

                        if (!user.google.token) { // if unlinked account

                            // relink the user with google credentials
                            return addGoogle(user, profile, token, done);

                        }

                        return done(null, user);

                    } else { // if user does not exist

                        // create a new user with google credentials
                        return addGoogle(request.user, profile, token, done);

                    }

                });

            } else { // if user is logged in

                return addGoogle(request.user, profile, token, done);

            }

        });

    }));

};


// =============================================================================
// Add Methods =================================================================
// =============================================================================

// addFacebook:
//      Sets the user facebook variables, writes it to
//      the database and saves the user to the session
// Returns saved user on success, error on failure
function addFacebook(user, profile, token, done) {

    user.facebook.id    = profile.id;
    user.facebook.token = token;
    user.facebook.name  = profile.displayName;
    user.facebook.email = profile.emails[0].value;

    user.save(function(err) { // save facebook credentials to db

        if (err) {

            throw err;

        }

        return done(null, user); // save user to session

    });

}


// addTwitter:
//      Sets the user twitter variables, writes it to
//      the database and saves the user to the session
// Returns saved user on success, error on failure
function addTwitter(user, profile, token, done) {

    user.twitter.id             = profile.id;
    user.twitter.token          = token;
    user.twitter.username       = profile.username;
    user.twitter.name           = profile.displayName;

    user.save(function (err) { // save twitter credentials to db

        if (err) { // if error

            throw err;

        }

        return done(null, user); // pass user to session

    });

}

// addGoogle:
//      Sets the user google variables, writes it to
//      the database and saves the user to the session
// Returns saved user on success, error on failure
function addGoogle(user, profile, token, done) {

    // set all of the relevant information
    user.google.id = profile.id;
    user.google.token = token;
    user.google.name = profile.displayName;
    user.google.email = profile.emails[0].value;

    user.save(function (err) { // save google credentials to db

        if (err) { // if error occurs

            throw err;

        }

        return done(null, user); // pass user to session

    });

}