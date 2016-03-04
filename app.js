var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler')

var mongo = require('mongodb'); 
var monk = require('monk'); 
var db = monk('localhost:27017/nodetest1'); // load db

var http = require('http');
var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');
var routes1 = require('./routes/routes');

// load config file
var config = require('./config.json')[app.get('env')]; // choose config for current env
console.log(config)
console.log(config.db_host); // 192.168.1.9
console.log(config.db_user); // myappdb
console.log(config.db_pass); // !p4ssw0rd#

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// use middlewares
app.use(logger('dev')); // log information to server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // set public directory

// Make our db accessible to our router 
app.use(function(req,res,next){ 
  req.db = db; 
  next(); 
});

// set router handlers
app.use('/', routes);
app.use('/users', users);
app.use('/route1', routes1);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


   http.createServer(app).listen(3000, function(){
     console.log('Express server listening on port ' + 3000);
});


module.exports = app;








