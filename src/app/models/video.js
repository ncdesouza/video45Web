//  app/models/user.js

// load dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./comment');
var commentSchema = mongoose.model('Comment').schema;

var videoSchema = Schema({
    author      : { type: Schema.Types.ObjectId, ref: 'User'},
    videoURL    : String,
    date        : Date,
    title       : String,
    description : String,
    likes       : [{type: Schema.Types.ObjectId, ref: 'User'}],
    views       : Number,
    comments    : [{type: Schema.Types.ObjectId, ref: 'Comments'}]
});

//var deepPopulate = require('moongoose-deep-populate')(mongoose);
//videoSchema.plugin(deepPopulate);
// export model ================================================================
module.exports = mongoose.model('Video', videoSchema);


