//  app/models/user.js

// load dependencies
var mongoose = require('mongoose');
var async = require('async');
var Schema = mongoose.Schema;
require('./comment');
var commentSchema = mongoose.model('Comment').schema;

var videoSchema = Schema({
    author      : { type: Schema.Types.ObjectId, ref: 'User'},
    videoURL    : String,
    date        : Date,
    title       : String,
    description : String,
    likes       : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    views       : {type: Number, default: 0},
    comments    : [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

videoSchema.methods.findLikesById = function (userId, callback) {
    var index = this.likes.indexOf(userId);
    if (index > -1) {
        return callback(null, userId);
    }
    return callback(null, null);
};

// export model ================================================================
module.exports = mongoose.model('Video', videoSchema);


