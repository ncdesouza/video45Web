var Video = require('../../models/video');
var jwt = require('jsonwebtoken');

/**
 * Created by nicholas on 07/11/15.
 */
module.exports = function (app) {
    app.get('/api/public', function (req, res) {
        var token = req.headers.authorization;

        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) return res.json({success: false, msg: 'Failed token', data: ''});

            Video
                .find({})
                .sort({date: -1})
                .populate({
                        path: 'author',
                        select: '-_id -videos -google -twitter -facebook -password -email',
                        model: 'User'
                }).exec(function(err, doc) {
                    res.json({success: true, msg: 'Trending Videos', data: doc})
                });

        });

    });
};