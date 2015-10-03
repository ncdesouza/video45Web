/**
 * Created by nicholas on 29/09/15.
 */

// connect to db
var mongoose = require('mongoose');
var configDB = require('../src/config/database');
mongoose.connect(configDB.urlDev); // connect to db

var User = require('../src/app/models/user');
var Video = require('../src/app/models/video');
var Comment = require('../src/app/models/comment');

function callback(err) {
    if (err) return console.log(err);
}

var user1 = new User({
    email: 'user1@test.com',
    password: 'test',
    firstName: 'user1',
    lastName: 'test'
});

user1.password = user1.generateHash('test');

var user2 = new User({
    email: 'user2@test.com',
    password: 'test',
    firstName: 'user2',
    lastName: 'test'
});

user2.password = user2.generateHash('test');


var video1 = new Video({
    author: user1,
    videoURL: '/public/vid/dock.mp4',
    date: new Date(2015, 9, 21),
    title: 'Video1',
    description: 'Test video'
});

var video2 = new Video({
    author: user2,
    videoURL: '/public/vid/river.mp4',
    date: new Date(2015, 9, 21),
    title: 'Video2',
    description: 'Test video'
});

var comment1 = new Comment({
    author : user2,
    comment : 'Comment1',
    date    : new Date(2015, 9, 21)
});

var comment2 = new Comment({
    author : user1,
    comment : 'Comment2',
    date    : new Date(2015, 9, 22)
});



//user1.save(callback);
//user2.save(callback);
//
video1.comments.push(comment1);
video2.comments.push(comment2);
//
comment1.save(callback);
comment2.save(callback);
//
video1.save(callback);
video2.save(callback);
//
//user1.videos.push(video1);
//user2.videos.push(video2);
//
//user1.save(callback);
//user2.save(callback);


User
    .findOne({ email: 'user1@test.com' })
    .exec(function(err, user) {
        if (err) return console.log(err);
        video1.author = user;
        video2.author = user;

        video1.save(callback);
        video2.save(callback);

        user.videos.push(video1);
        user.videos.push(video2);
        user.save(callback);
        //user.getVideos(function(err, videos) {
        //    console.log(videos)
        //});
    });

//console.log(user1);
