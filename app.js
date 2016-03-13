var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler')

var mongoose = require('mongoose');
var passport = require('passport');
var session      = require('express-session');

var flash    = require('connect-flash');
var mongo = require('mongodb'); 
var monk = require('monk'); 
var db = monk('localhost:27017/nodetest2'); // load db
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var http = require('http');
var app = express();

var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration


// load routers
var routes = require('./routes/index');
var users = require('./routes/users');
var routes1 = require('./routes/routes');

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
//app.set('view engine', 'jade');
app.set('view engine', 'ejs'); // set up ejs for templating

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));


app.use(logger('dev')); // log information to server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // set public directory

// required for passport
// use express-sessoon to session-handling
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// =============== Testing ================
/*
var User            = require('./app/models/user');
var Item = require('./app/models/item');

// maunally insert item here
// create a new user called chris
var chris = new User()
chris.local.email = 'Chris@test.com' + Date()
chris.local.password = chris.generateHash('password');

// call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});

// find a user
User.find({'local.email': 'test1@test.com'},function(err,user){
  if(err) throw err;

  console.log(user)

})
var newItem = new Item()
newItem.userID = 'testuserid'
newItem.createDate = Date()
newItem.save(function(err) {
  if (err) throw err;
})

Item.find({},function(err,item){
  if(err) throw  err
  console.log(item)
})
// ========================================
// Make our db accessible to our router 
app.use(function(req,res,next){ 
  req.db = db; // assign db to reg
  next(); 
});
*/

// use middlewares

// set router handlers
//app.use('/', routes);
//app.use('/users', users);
//app.use('/route1', routes1);

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

var port = process.env.PORT || 3000
http.createServer(app).listen(port, function(){
     console.log('Express server listening on port ' + port);
});


module.exports = app;








