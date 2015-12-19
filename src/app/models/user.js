//  app/models/user.js

// load dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
require('./video');
require('./comment');

var userSchema = Schema({
    email       : String,
    password    : String,
    username    : String,
    firstName   : String,
    lastName    : String,
    profilePic  : { type: String, default: '/public/img/ovowl.png' },
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
    },
    videos : [{ type: Schema.Types.ObjectId, ref: 'Video'}]
});

// user methods ================================================================
// generate hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getVideos = function(callback) {
    this.model('User')
        .findOne({ email: this.email })
        .populate({path: 'videos', options: {sort: {date: -1}}})
        .exec(function(err, doc) {
            doc.populate({
                path: 'videos.author',
                select: '-_id -videos -google -twitter -facebook -password -email',
                model: 'User'
            }, function(err, doc) {
                doc.populate({
                    path: 'videos.comments',
                    model: 'Comment',
                    options: {sort: {date: 1}}
                }, function (err, doc) {
                    doc.populate({
                        path: 'videos.comments.author',
                        select: '-_id -videos -google -twitter -facebook -password -email',
                        model: 'User'
                    }, function (err, doc) {
                        callback(null, doc);
                    });
                });
            });
        }
    );
};


// export model ================================================================
module.exports = mongoose.model('User', userSchema);