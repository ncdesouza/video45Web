/**
 * Created by nicholas on 29/09/15.
 */
// imports
var Promise = require('promise');

// connect to db
var mongoose = require('mongoose');
var configDB = require('../src/config/database');
mongoose.connect(configDB.urlDev); // connect to db

// get db models
var User = require('../src/app/models/user');
var Video = require('../src/app/models/video');
var Comment = require('../src/app/models/comment');

// get test data
var usersData = require('./users.json');
var videosData = require('./videos.json');
var commentsData = require('./comments.json');

var videoUrls = [
    'Gucci Mane - Lemonade OFFICIAL VIDEO.mp4',
    'Bobby Shmurda - Hot Ngga.mp4',
    'AAP ROCKY - Fkin Problems ft Drake 2 Chainz Kendrick Lamar.mp4',
    'OT Genasis - CoCo Music Video.mp4',
    'Ty Dolla ign - Or Nah ft The Weeknd Wiz Khalifa  DJ Mustard Music Video.mp4',
    'Wiz Khalifa - On My Level Ft Too Short Official Music Video.mp4',
    'Wiz Khalifa - We Dem Boyz Official Video.mp4'
];


var user1 = new User({
    email: 'user1@test.com',
    password: 'test',
    firstName: 'user1',
    lastName: 'test',
    username: 'user1'
});

user1.password = user1.generateHash('test');

var user2 = new User({
    email: 'user2@test.com',
    password: 'test',
    firstName: 'user2',
    lastName: 'test',
    username: 'user2'
});

user2.password = user2.generateHash('test');


var video1 = new Video({
    author: user1,
    videoURL: '/public/vid/' + videoUrls[Math.floor(Math.random() * videoUrls.length)],
    date: new Date(2015, 9, 21),
    title: 'Video1',
    description: 'Test video'
});

var video2 = new Video({
    author: user2,
    videoURL: '/public/vid/' + videoUrls[Math.floor(Math.random() * videoUrls.length)],
    date: new Date(2015, 9, 22),
    title: 'Video2',
    description: 'Test video'
});

var video3 = new Video({
    author: user1,
    videoURL: '/public/vid/' + + videoUrls[Math.floor(Math.random() * videoUrls.length)],
    date: new Date(2015, 9, 23),
    title: 'Video3',
    description: 'Test video'
});

var video4 = new Video({
    author: user1,
    videoURL: '/public/vid/' + + videoUrls[Math.floor(Math.random() * videoUrls.length)],
    date: new Date(2015, 9, 24),
    title: 'Video4',
    description: 'Test video'
});

var video5 = new Video({
    author: user1,
    videoURL: '/public/vid/' + + videoUrls[Math.floor(Math.random() * videoUrls.length)],
    date: new Date(2015, 9, 25),
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
    date    : new Date(2015, 9, 23)
});

var comment4 = new Comment({
    author : user2,
    comment : 'Comment4',
    date    : new Date(2015, 9, 24)
});

var comment5 = new Comment({
    author : user2,
    comment : 'Comment5',
    date    : new Date(2015, 9, 25)
});



user1.save(callback);
user2.save(callback);

video1.comments.push(comment1);
video1.comments.push(comment2);
video1.comments.push(comment3);
video1.comments.push(comment4);
video1.comments.push(comment5);
video3.comments.push(comment3);
video4.comments.push(comment4);
video5.comments.push(comment5);
video2.comments.push(comment2);

comment1.save(callback);
comment2.save(callback);
comment3.save(callback);
comment4.save(callback);
comment5.save(callback);

video1.save(callback);
video2.save(callback);
video3.save(callback);
video4.save(callback);
video5.save(callback);

user1.videos.push(video1);
user1.videos.push(video3);
user1.videos.push(video4);
user1.videos.push(video5);

user2.videos.push(video2);

user1.save(callback);
user2.save(callback);


function
callback(err) {
    if (err) throw err;
}


function
closeDB() {
    mongoose.connection.close();
}


//function
//buildUsers() {
//    return new Promise(function (fulfill, reject) {
//        var users = [];
//        for (var i = 0; i < usersData.length; i++) {
//            var user = new User(usersData[i]);
//            user.generateHash('test');
//            user.save(function(err) {
//                if (err) throw err;
//                console.log('New user created: ' + this.firstName + ' ' + this.lastName);
//                users.push(this);
//            });
//        }
//    });
//}
//
//function
//saveUser() {
//    return new Promise(function (fulfill, reject) {
//        user.save(function(err) {
//            if (err) throw err;
//            console.log('New user created: ' + this.firstName + ' ' + this.lastName);
//            users.push(this);
//        });
//    });
//}
//


//function callback(err) {
//    if (err) return console.log(err);
//}
//