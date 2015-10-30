/**
 * Created by nicholas on 30/10/15.
 */

var sys = require('sys');
var exec = require('child-process').exec;
var child

module.exports = function(app, passport) {
    app.post('/api/github', function(req, res) {
        child = exec("sudo git pull")
    });
};