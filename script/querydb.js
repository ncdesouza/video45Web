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


User
    .findOne({ username: 'user1' })
    .populate('videos')
    .sort({date: 1})
    .exec(
    function(err, doc) {
        console.log(doc);
    //    User.populate(doc, {
    //            path: 'videos.author',
    //            select: '-_id -videos -google -twitter -facebook -password -email',
    //            model: User
                options: { sort : {date: -1}}
        //}).populate({
        //    path: 'videos.comments',
        //    model: Comment,
        //    options: { sort : {date: 1}}
        //}).populate({
        //    path: 'videos.comments.author',
        //    select: '-_id -videos -google -twitter -facebook -password -email',
        //    model: User
        //}, function (err, doc) {
        //    console.log(doc);
        //});
    });



//function
//queryDB() {
//    return new Promise(function (fufill, reject) {
//                    closeDB();
//    })
//}
//
//function
//findUser() {
//    return new Promise(function (fufill, reject) {
//
//    })
//}
//
//function
//findVideos() {
//    return new Promise(function (fufill, reject) {
//
//    })
//}
//
//
//
//
//function
//closeDB() {
//        mongoose.connection.close();
//}


//queryDB();
