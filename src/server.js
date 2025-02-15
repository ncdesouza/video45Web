// server.js

// set up ======================================================================
var express = require('express');
var app = express();
//var cors = require('cors');
//app.use('*', cors());


var port = process.env.Port || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var upload = require('multer')({ dest: '../public/uploads'});

var configDB = require('./config/database.js');
var config = require('./config/secret');

// config ======================================================================
mongoose.connect(configDB.urlDev); // connect to db

require('./config/passport')(passport); // pass passport for config
var transporter = require('./config/email')(nodemailer); // pass nodemailer for config

app.set('superSecret', config.secret);

// setup express app
app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); // cookie management
app.use(bodyParser()); // html form handler

app.set('view engine', 'jade'); // setup ejs for templates
app.set('views', __dirname + '/app/views');

// setup passport
app.use(session({ secret : 'video454life' }));
app.use(passport.initialize());
app.use(passport.session());

// setup utilities
app.use(flash());
app.use(upload);


// set static directories
app.use('/public', express.static('../public'));
app.use('/bower_components',  express.static('../bower_components'));

var allowCrossDomain = function(req, res, next) {
    var host = req.get('origin');
    res.header('Access-Control-Allow-Origin', host);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);

// controllers ======================================================================
require('./app/controllers/public/public.js')(app, passport, transporter);
require('./app/controllers/user/user.js')(app, passport);
require('./app/controllers/api/api.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('Video45 server launch at 127.0.0.1:' + port);
