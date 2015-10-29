// config/auth.js

module.exports = {
    'facebookAuth' : {
        'clientID'          : '946354082075134',
        'clientSecret'      : '16cd3ee600a844ba638ca12bc39e1107',
        'authCallbackURL'   : 'http://127.0.0.1:8080/auth/facebook/callback',
        'loginCallbackURL'  : 'http://127.0.0.1:8080/login/facebook/callback',
        'linkCallbackURL'   : 'http://127.0.0.1:8080/connect/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : '9ATUERC19mkhvxT3pi2nmBAk9',
        'consumerSecret'    : 'mkyxeQao65mFmb0G6GtblfA9b6LadALSXCwf54w3mNDQdU0s65',
        'authCallbackURL'   : 'http://127.0.0.1:8080/auth/twitter/callback',
        'loginCallbackURL'  : 'http://127.0.0.1:8080/login/twitter/callback',
        'linkCallbackURL'   : 'http://127.0.0.1:8080/connect/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '580837337311-oardpuhrll7aro00smvh3nbn593l50u6.apps.googleusercontent.com',
        'clientSecret'  : 'iHHvnh2HEYDyIMQIDbIt1NmB',
        'authCallbackURL'   : 'http://127.0.0.1:8080/auth/google/callback',
        'loginCallbackURL'  : 'http://127.0.0.1:8080/login/google/callback',
        'linkCallbackURL'   : 'http://127.0.0.1:8080/connect/google/callback'
    },

    'gmail' : {
        'email'     : 'video45.cloudapp@gmail.com',
        'password'  : 'video45!'
    }
};
