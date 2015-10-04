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

var video3 = new Video({
    author: user1,
    videoURL: '/public/vid/river.mp4',
    date: new Date(2015, 9, 21),
    title: 'Video3',
    description: 'Test video'
});

var video4 = new Video({
    author: user1,
    videoURL: '/public/vid/dock.mp4',
    date: new Date(2015, 9, 21),
    title: 'Video4',
    description: 'Test video'
});

var video5 = new Video({
    author: user1,
    videoURL: '/public/vid/river.mp4',
    date: new Date(2015, 9, 21),
    title: 'Video5',
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

var comment3 = new Comment({
    author : user1,
    comment : 'Comment3',
    date    : new Date(2015, 9, 21)
});

var comment4 = new Comment({
    author : user2,
    comment : 'Comment4',
    date    : new Date(2015, 9, 23)
});

var comment5 = new Comment({
    author : user2,
    comment : 'Comment5',
    date    : new Date(2015, 9, 25)
});



//user1.save(callback);
//user2.save(callback);
//
//video1.comments.push(comment1);
//video1.comments.push(comment2);
//video1.comments.push(comment3);
//video1.comments.push(comment4);
//video1.comments.push(comment5);
//video3.comments.push(comment3);
//video4.comments.push(comment4);
//video5.comments.push(comment5);
//video2.comments.push(comment2);
//
//comment1.save(callback);
//comment2.save(callback);
//comment3.save(callback);
//comment4.save(callback);
//comment5.save(callback);
//
//video1.save(callback);
//video2.save(callback);
//video3.save(callback);
//video4.save(callback);
//video5.save(callback);
//
//user1.videos.push(video1);
//user1.videos.push(video3);
//user1.videos.push(video4);
//user1.videos.push(video5);
//
//user2.videos.push(video2);
//
//user1.save(callback);
//user2.save(callback);

//.exec(function(err, user) {
//    if (err) return console.log(err);
//    user.getVideos(function(err, videos) {
//        console.log(videos)
//    });
//});

User
    .findOne({ email: 'user1@test.com' })
    .populate('videos')
    .exec(function (err, user) {
        if (err) throw err;

        getVideos(user);
        closeDB()
    });


function
getVideos(user) {
    for(var i = 0; i < user.videos.length; i++) {
        var video = user.videos[i];
        //video = video.toObject();
        //console.log(video instanceof mongoose.Document);
        var likeIndex = video.likes.indexOf(user._id);
        console.log(likeIndex);
        if(likeIndex > -1) {
            Video.update( { _id : video._id }, {$pull : { likes: user.id }}, function (err) {
                console.log('Removed Like')
            });
            //video.save(function(err) {
            //    if(err) throw err;
            //    console.log('removed ' + user._id);
            //});
        //console.log(video);
        }
    }
}


function
closeDB() {
    mongoose.connection.close();
}