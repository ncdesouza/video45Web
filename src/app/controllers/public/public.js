

module.exports = function(app, passport) {

    require('./prereg')(app);

    require('./index')(app, passport);
    require('./login')(app, passport);
    require('./register')(app, passport);


};