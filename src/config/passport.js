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
    // video45 sign up ==========================================================
    // =========================================================================
    passport.use('signup', new LocalStrategy({

        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true

    }, function(request, email, password, done) {
        process.nextTick(function() {

            User.findOne({ 'email' : email }, function(err, user) {

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
                    newUser.firstName = request.body.firstName;
                    newUser.lastName = request.body.lastName;
                    newUser.email = email;
                    newUser.username = request.body.username;
                    newUser.password = newUser.generateHash(password);

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
    passport.use('login', new LocalStrategy({

            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true

        }, function(request, email, password, done) {

            User.findOne({ 'email' : email } , function(err, user) {

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
    passport.use('facebook-auth', new FacebookStrategy({

            // pull in our app id and secret from our register.js file
            clientID            : configAuth.facebookAuth.clientID,
            clientSecret        : configAuth.facebookAuth.clientSecret,
            callbackURL         : configAuth.facebookAuth.authCallbackURL,
            profileFields       : ['emails', 'displayName']

        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // search database for user by facebook id
                User.findOne({'facebook.id': profile.id}, function (err, user) {

                    // if search error
                    if (err) {

                        // return error
                        return done(err);

                    }

                    if (user) { // if the user is found

                        return done(null, false, request.flash('signupMessage',
                            'You have already registered'));

                    } else { // if not user is found

                        process.nextTick(function() {
                            profile.emails.forEach(function(item) {
                                User.findOne({'email': item}, function(err, user) {
                                    if (err) {
                                        return done(err);
                                    }

                                    if (user) {
                                        return done(null, false, request.flash('signupMessage',
                                            'It seems like you have already registered using a different account.\n' +
                                            'Sign in with that account and you can link your facebook account to it.'));
                                    }
                                })
                            });
                        });

                        // create new user with facebook credentials
                        return addFacebook(new User(), profile, token, done);

                    }

                });

            });

        }));

    passport.use('facebook-login', new FacebookStrategy({

            // pull in our app id and secret from our register.js file
            clientID            : configAuth.facebookAuth.clientID,
            clientSecret        : configAuth.facebookAuth.clientSecret,
            callbackURL         : configAuth.facebookAuth.loginCallbackURL,
            profileFields       : ['emails', 'displayName'],
            passReqToCallback   : true

        },

        // facebook will send back the token and profile
        function(request, token, refreshToken, profile, done) {

            process.nextTick(function() {

                if (!request.user) {

                    // search database for user by facebook id
                    User.findOne({'facebook.id': profile.id}, function (err, user) {

                        // if search error
                        if (err) {

                            // return error
                            return done(err);

                        }

                        if (user) { // if the user is found

                            return done(null, user);

                        }

                        return done(null, false, request.flash('loginMessage',
                            'We could not find you in our records. Please ' +
                            'click the link at the bottom and sign up for ' +
                            'an account.'));

                    });

                } else {

                    return done(null, request.user);

                }

            });

        }));

    passport.use('facebook-link', new FacebookStrategy({

            // pull in our app id and secret from our register.js file
            clientID            : configAuth.facebookAuth.clientID,
            clientSecret        : configAuth.facebookAuth.clientSecret,
            callbackURL         : configAuth.facebookAuth.linkCallbackURL,
            profileFields       : ['emails', 'displayName'],
            passReqToCallback   : true

        },

        // facebook will send back the token and profile
        function(request, token, refreshToken, profile, done) {

            if (request.user) {

                return addFacebook(request.user, profile, token, done)

            } else {

                return done(null, false)

            }

        }));


    // =========================================================================
    // Twitter =================================================================
    // =========================================================================
    passport.use('twitter-auth', new TwitterStrategy({

        consumerKey         : configAuth.twitterAuth.consumerKey,
        consumerSecret      : configAuth.twitterAuth.consumerSecret,
        callbackURL         : configAuth.twitterAuth.authCallbackURL

    },

        function(token, tokenSecret, profile, done) {

        process.nextTick(function() {

            // search database for user by facebook id
            User.findOne({'twitter.id': profile.id}, function (err, user) {

                // if search error
                if (err) {

                    // return error
                    return done(err);

                }

                if (user) { // if the user is found

                    return done(null, false, request.flash('signupMessage',
                        'You have already registered. Click Login at the bottom of ' +
                        'the page to login to your account'));

                } else { // if not user is found

                    //process.nextTick(function() {
                    //    profile.emails.forEach(function(item) {
                    //        User.findOne({'email': item}, function(err, user) {
                    //            if (err) {
                    //                return done(err);
                    //            }
                    //
                    //            if (user) {
                    //                return done(null, false, request.flash('signupMessage',
                    //                    'It seems like you have already registered using a ' +
                    //                    'different account. Sign in with that account and you ' +
                    //                    'can link your twitter account to it.'));
                    //            }
                    //        })
                    //    });
                    //});

                    // create new user with facebook credentials
                    return addTwitter(new User(), profile, token, done);

                }
            });
        });
    }));

    passport.use('twitter-login', new TwitterStrategy({

            consumerKey         : configAuth.twitterAuth.consumerKey,
            consumerSecret      : configAuth.twitterAuth.consumerSecret,
            callbackURL         : configAuth.twitterAuth.loginCallbackURL,
            passReqToCallback   : true

        },

        function(request, token, tokenSecret, profile, done) {

            process.nextTick(function() {

                if (!request.user) {

                    // search database for user by facebook id
                    User.findOne({'twitter.id': profile.id}, function (err, user) {

                        // if search error
                        if (err) {

                            // return error
                            return done(err);

                        }

                        if (user) { // if the user is found

                            return done(null, user);

                        }

                        return done(null, false, request.flash('loginMessage',
                            'We could not find you in our records. Please ' +
                            'click the link at the bottom and sign up for ' +
                            'an account.'));

                    });

                } else {

                    return done(null, request.user);

                }

            });

        }));


    passport.use('twitter-link', new TwitterStrategy({

            consumerKey         : configAuth.twitterAuth.consumerKey,
            consumerSecret      : configAuth.twitterAuth.consumerSecret,
            callbackURL         : configAuth.twitterAuth.linkCallbackURL,
            passReqToCallback   : true

        },

        function(request, token, tokenSecret, profile, done) {

            if (request.user) {

                return addTwitter(request.user, profile, token, done)

            } else {

                return done(null, false)

            }

        }));


    // =========================================================================
    // Google ==================================================================
    // =========================================================================
    passport.use('google-auth', new GoogleStrategy({

        clientID            : configAuth.googleAuth.clientID,
        clientSecret        : configAuth.googleAuth.clientSecret,
        callbackURL         : configAuth.googleAuth.authCallbackURL

    },

        function(request, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // search database for user by facebook id
                User.findOne({'google.id': profile.id}, function (err, user) {

                    // if search error
                    if (err) {

                        // return error
                        return done(err);

                    }

                    if (user) { // if the user is found

                        return done(null, false, request.flash('signupMessage',
                            'You have already registered'));

                    } else { // if not user is found

                        process.nextTick(function() {
                            profile.emails.forEach(function(item) {
                                User.findOne({'email': item}, function(err, user) {
                                    if (err) {
                                        return done(err);
                                    }

                                    if (user) {
                                        return done(null, false, request.flash('signupMessage',
                                            'It seems like you have already registered using a different account.\n' +
                                            'Sign in with that account and you can link your google account to it.'));
                                    }
                                })
                            });
                        });

                        // create new user with facebook credentials
                        return addGoogle(new User(), profile, token, done);

                    }

                });

            });

        }));

    passport.use('google-login', new GoogleStrategy({

            clientID            : configAuth.googleAuth.clientID,
            clientSecret        : configAuth.googleAuth.clientSecret,
            callbackURL         : configAuth.googleAuth.loginCallbackURL,
            passReqToCallback   : true

        },

        function(request, token, refreshToken, profile, done) {

            process.nextTick(function() {

                if (!request.user) {

                    // search database for user by facebook id
                    User.findOne({'google.id': profile.id}, function (err, user) {

                        // if search error
                        if (err) {

                            // return error
                            return done(err);

                        }

                        if (user) { // if the user is found

                            return done(null, user);

                        }

                        return done(null, false, request.flash('loginMessage',
                            'We could not find you in our records. Please ' +
                            'click the link at the bottom and sign up for ' +
                            'an account.'));

                    });

                } else {

                    return done(null, request.user);

                }

            });

        }));

    passport.use('google-link', new GoogleStrategy({

            clientID            : configAuth.googleAuth.clientID,
            clientSecret        : configAuth.googleAuth.clientSecret,
            callbackURL         : configAuth.googleAuth.linkCallbackURL,
            passReqToCallback   : true

        },

        function(request, token, refreshToken, profile, done) {

            if (request.user) {

                return addGoogle(request.user, profile, token, done)

            } else {

                return done(null, false)

            }

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

    //console.log(profile);

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