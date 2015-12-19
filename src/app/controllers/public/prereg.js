/**
 * Created by nicholas on 18/12/15.
 */

var PreReg = require('../../models/pre-reg');

module.exports = function(app) {
    app.post('/pre-register', function(req, res) {
        var reg = new PreReg({email: req.body.email});
        reg.save(function(err) {
            if (err) throw err;
            res.redirect('/')
        });
    })
};