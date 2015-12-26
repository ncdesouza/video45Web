/**
 * Created by nicholas on 25/10/15.
 */


module.exports = function(app, passport) {

    require('./login')(app, passport);
    require('./signup')(app, passport);
    require('./profile')(app);
    require('./public')(app);
    require('./github')(app);
};