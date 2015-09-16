// server.js

// set up ======================================================================
var express = require('express');
var app = express();
var port = process.env.Port || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');


// config ======================================================================
mongoose.connect(configDB.url); // connect to db

require('./config/passport')(passport); // pass passport for config

// setup express app
app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); // cookie management
app.use(bodyParser()); // html form handler

app.set('view engine', 'ejs'); // setup ejs for templates

// setup passport
app.use(session({ secret : 'video454life' }));
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());


// routes ======================================================================
require('./app/routes.js')(app, passport); // load routes and passport to app


// launch ======================================================================
app.listen(port);
console.log('Video45 server launch at 127.0.0.1:' + port);