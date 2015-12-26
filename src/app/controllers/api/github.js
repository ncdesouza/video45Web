/**
 * Created by nicholas on 30/10/15.
 */

var sys = require('sys');
var exec = require('child_process').exec;

module.exports = function(app, passport) {
    app.post('/api/github', function(req, res) {
        var payload = req.body;
        if (payload.repository.full_name == 'ncdesouza/video45Web') {
            if (payload.ref == 'refs/head/master') {
                console.log(payload.ref);
                console.log('Preforming a Git Pull');
                exec('/home/video45/www/video45Web/script/github/hook.sh',
                function(err, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (err !== null) {
                        console.log('ERROR: ' + err);
                    }
                });
            }
            res.status(200).send();
        }
    });
};
