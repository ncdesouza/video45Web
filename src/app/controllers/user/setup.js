var videos = [
    '/public/vid/dock.mp4',
    '/public/vid/frontier.mp4',
    '/public/vid/river.mp4'
];

var videoPaths = JSON.stringify(videos);
module.exports = function(app, passport, isLoggedIn, transporter) {

    app.get('/setup', isLoggedIn, function(request, response) {


        response.render('setup', {  videoPath: videoPaths, user: request.user });

    });

    app.post('/confirm-email', function(req, res) {

        req.user.email = req.body.email;
        req.user.save();

        res.redirect('/setup');

    });

    app.post('/upload-image', function(req, res) {

        var fileName = req.user.firstName + req.user.lastName;
        fileName = '/public/img/profile/' + fileName.replace(/\s+/g, '');
        var imgBase64 = req.body.imgBase64.split(",")[1];
        var base64 = require('node-base64-image');
        var options = {filename: '..' + fileName};
        var imgData = new Buffer(imgBase64, 'base64');
        base64.base64decoder(imgData, options, function(err, saved) {
           if (err) { console.log(err); }
            console.log(saved);
        });

        req.user.profilePic = fileName + '.jpg';

        req.user.save();

        res.status(200).send('Done');
        
    });


};
