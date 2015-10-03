var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Video = require('./video.js');
var User = require('./user.js');


var videoLikesSchema = new Schema({
    user: Schema.Types.ObjectId,
    video: Schema.Types.ObjectId
});


module.exports = mongoose.model('VideoLike', videoLikesSchema);