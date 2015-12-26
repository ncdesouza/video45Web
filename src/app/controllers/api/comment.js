var Comment = require('../../models/comment.js');
var Video = require('../../models/video.js');
module.exports = function(app, isValidUser) {

    app.post('/api/comment', isValidUser, function(req, res) {

            Video
                .findById(req.body.videoId)
                .exec(function (err, video) {
                    if (err) throw err;

                    var comment = new Comment({
                        'author'  : req.user,
                        'comment' : req.body.comment,
                        'date'    : Date.now()
                    });

                    comment.save(function (err) {
                        if (err) throw err;
                        video.comments.push(comment);
                        video.save(function (err) {
                            if (err) throw err;
                            res.json(comment);
                        });
                    });
                }
            );
        }
    )
};