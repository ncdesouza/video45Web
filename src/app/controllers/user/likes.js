var Video = require('../../models/video.js');

module.exports = function(app, isLoggedIn) {
    app.post('/api/like', isLoggedIn, function(req, res) {
        Video.findById(req.body.videoId, function(err, video) {
            if(err) throw err;
            video.findLikesById(req.user._id, function(err, userId) {
                if (userId) {
                    Video.update({ _id: video.id }, { $pull: { likes: userId } }, function(err) {
                       if (err) throw err;
                       res.json({'action': 'removed'});
                    });
                } else {
                    Video.update( { _id: video.id }, { $push: { likes: req.user._id } }, function(err) {
                        if (err) throw err;
                        res.json({'action': 'added'});
                    });
                }
            });
        });
    });

};