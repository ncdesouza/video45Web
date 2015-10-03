var Video = require('../../models/video.js');
var VideoLike = require('../../models/video-likes.js');

module.exports = function(app, isLoggedIn) {

    app.post('/api/like', isLoggedIn, function(req, res) {

        VideoLike
            .findOne({ user : req.user })
            .where('video').equals(req.body.videoId)
            .exec(function(err, like) {
                if(like) {
                    console.log(like);
                    VideoLike
                        .findByIdAndRemove(like._id, function (err) {
                            if (err) throw err;
                            res.json({'action': 'removed'});
                        });
               } else {
                   Video.findById(req.body.videoId, function(err, video) {
                       if (err) throw err;
                       var videoLike = new VideoLike({
                           user    : req.user,
                           video   : video
                       });
                       console.log(video);
                       videoLike.save(function(err) {
                           if (err) throw err;
                           res.json({'action': 'added'});
                       });

                   });
               }
            });
    });

};