var Comment = require('../../models/comment.js');
var Video = require('../../models/video.js');
module.exports = function(app) {

    app.post('/comment/:videoId', function(req, res) {

            Video
                .findById(req.param.videoId)
                .exec(function (err, video) {
                    if (err) throw err;

                    var comment = new Comment({
                        'author'  : req.user,
                        'comment' : req.body.comment,
                        'date'    : new Date.now()
                    });

                    comment.save(function (err) {
                        if (err) throw err;
                        video.comments.push(comment);
                        video.save(function (err) {
                            if (err) throw err;
                            res.send(comment);
                        });
                    });
                }
            );
        }
    )
};