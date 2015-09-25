

module.exports = function(app, passport, transporter) {

    app.get('/setup', function(request, response) {

        if (request.user.email) {

            response.render('setup.ejs', {
                title : 'video45 - Setup'
            })

        } else if (request.user.facebook.id) {

            response.render('fbsetup.ejs', {})

        } else if (request.user.twitter.id) {

            response.render('tsetup.ejs', {})

        } else if (request.user.google.id) {

            response.render('gsetup.ejs', {})

        } else {

            response.redirect('/')

        }

    });

    //app.post('/', upload.single('dp'), function(req, res))

};
