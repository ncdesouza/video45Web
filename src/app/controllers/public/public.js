

module.exports = function(app, passport) {

    require('./index')(app, passport);
    require('./login')(app, passport);
    require('./register')(app, passport);

};