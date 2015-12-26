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
                exec('/home/video45/www/video45Web/script/github/hook.sh)
            }
        }
    });
};
