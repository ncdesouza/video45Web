var videos = [
    '/public/vid/dock.mp4',
    '/public/vid/frontier.mp4',
    '/public/vid/river.mp4'
];

module.exports = function(app, passport) {

    // index ===================================================================
    app.get('/', function (req, res) {
        if (req.user) {
            res.redirect('/' + req.user.username);
        }
        var videoPaths = JSON.stringify(videos);
        res.render('index', {message: req.flash('loginMessage'), videoPath: videoPaths});
    });
};