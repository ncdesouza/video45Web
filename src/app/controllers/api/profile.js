

module.exports = function (app) {
    app.get('/api/test', function (req, res) {
        //var token = req.body.token || req.query.token || req.headers['x-access-token'];
        console.log(req.headers);
        res.json({success: true});
        //jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        //    if (err) return res.json({success: false, msg: 'Failed token'});
        //    else req.decoded = decoded;
        //
        //    console.log(decoded);
        //    res.json(decoded);
        //});

    });
}