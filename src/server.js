// server.js

// set up ======================================================================
var express = require('express');
var app = express();
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

// config ======================================================================
mongoose.connect(configDB.urlDev); // connect to db

require('./config/passport')(passport); // pass passport for config
var transporter = require('./config/email')(nodemailer); // pass nodemailer for config


// setup express app
app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); // cookie management
app.use(bodyParser()); // html form handler

app.set('views', 'app/views');
app.set('view engine', 'jade'); // setup ejs for templates

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


// controllers ======================================================================
require('./app/controllers/public/public.js')(app, passport, transporter);
require('./app/controllers/user/user.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('Video45 server launch at 127.0.0.1:' + port);
