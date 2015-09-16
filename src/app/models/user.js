//  app/models/user.js

// load dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    video45         : {
        email       : String,
        password    : String
    },
    facebook        : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    },
    twitter         : {
        id          : String,
        token       : String,
        username    : String,
        name        : String
    },
    google          : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    }

});

// user methods ================================================================
// generate hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.video45.password);
};

// export model ================================================================
module.exports = mongoose.model('User', userSchema);


