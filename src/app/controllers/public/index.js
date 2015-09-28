var videos = [
    '/public/vid/dock.mp4',
    '/public/vid/frontier.mp4',
    '/public/vid/river.mp4'
];

module.exports = function(app, passport) {

    // index ===================================================================
    app.get('/', function (request, response) {
        var videoPaths = JSON.stringify(videos);
        response.render('index', {message: request.flash('loginMessage'), videoPath: videoPaths});
    });
};