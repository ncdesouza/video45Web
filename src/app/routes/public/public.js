

module.exports = function(app, passport, nev) {

    require('./login')(app, passport);
    require('./register')(app, passport);

};