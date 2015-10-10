/**
 * Created by nicholas on 29/09/15.
 */

// import Promise
var Promise = require('promise');

// connect to db
var mongoose = require('mongoose');
var configDB = require('../src/config/database');
mongoose.connect(configDB.urlDev); // connect to db

var User = require('../src/app/models/user');
var Video = require('../src/app/models/video');
var Comment = require('../src/app/models/comment');

function
purgeDB() {
    return new Promise(function (fufill, reject) {
        purgeComments().done(
            purgeVideos().done(
                purgeUsers().done(
                    closeDB)));
    })
}

function
purgeComments() {
    return new Promise(function(fulfill, reject) {
        Comment
            .remove({})
            .exec(function (err) {
                if (err) throw err;
                else fulfill()
            });
    });
}

function
purgeVideos() {
    return new Promise(function(fulfill, reject) {
        Video
            .remove({})
            .exec(function (err, videos) {
                if (err) throw err;
                else fulfill()
            });
    });
}

function
purgeUsers() {
    return new Promise(function(fulfill, reject) {
        User
            .remove({})
            .exec(function (err) {
                if (err) throw err;
                else fulfill()
            });
    });
}

function
closeDB() {
        mongoose.connection.close();
}


purgeDB();
