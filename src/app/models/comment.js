//  app/models/user.js
// load dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var User = require('./user');


var commentSchema = Schema({
    author      : { type: Schema.Types.ObjectId, ref: 'User'},
    comment     : String,
    date        : Date,
    likes       : [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

// export model ================================================================
module.exports = mongoose.model('Comment', commentSchema);



