var Video = require('../../models/video');
var jwt = require('jsonwebtoken');

/**
 * Created by nicholas on 07/11/15.
 */
module.exports = function (app, isValidUser) {

    app.get('/api/home', isValidUser,  function (req, res) {
        Video
            .find({})
            .sort({date: -1})
            .populate({
                    path: 'author',
                    select: '-_id -videos -google -twitter -facebook -password -email',
                    model: 'User'
            }).exec(function(err, doc) {
                if (err) throw err;
                res.json({success: true, msg: 'Trending Videos', data: doc})
            });

    });

};