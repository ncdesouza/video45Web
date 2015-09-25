

module.exports = function(app, passport) {

    require('./login')(app, passport);
    require('./register')(app, passport);
    require('./setup')(app, passport)

};