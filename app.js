
// set up ======================================================================
// get all the tools we need
var createError = require('http-errors');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//var port;     //= process.env.PORT || 8080;

var favicon = require('serve-favicon');
var router = express.Router();
var myRoutes = require('./app/routes.js'); //(app, passport);


// Database configuration & connection ===============================================================



//Set up mongoose connection, this is the Mlabs database managed with Mongoose ORM
var mongoDB = 'mongodb://thegardenappuser:sh4re4ble@ds231070.mlab.com:31070/thegardenapp';

//function called 'options' to be passed to mongoose.connect to follow current convention and move away 
//from the deprecated method
var options = {
  useMongoClient: true,
  autoIndex: true, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 1, // Maintain up to 1 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//var configDB = require('./config/database.js');

require('./config/passport.js')(passport); // pass passport for configuration


//var indexRouter = require('./routes/index'); X
//var aboutRouter = require('./routes/about'); X
//var contactRouter = require('./routes/contact');  X
//var cropRouter = require('./routes/crop'); X
//var dashboardRouter = require('./routes/dashboard'); X
//var dataRouter = require('./routes/data');  X
//var eventsRouter = require('./routes/events');  X

//var harvestRouter = require('./routes/harvest');  X
//var harvest_createRouter = require('./routes/harvest_create');
//var harvest_deleteRouter = require('./routes/harvest_delete');
//var harvest_editRouter = require('./routes/harvest_edit');

//var loginRouter = require('./app/routes');
//var logoutRouter = require('./app/routes');
//var signupRouter = require('./app/routes');

//var taskRouter = require('./routes/task');
//var task_createRouter = require('./routes/task_create');
//var task_deleteRouter = require('./routes/task_delete');
//var task_editRouter = require('./routes/task_edit');

//var usersRouter = require('./routes/users');
//var weatherRouter = require('./routes/weather');





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev')); // log every request to the console
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));               
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// required for passport
app.use(session({ 
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
})); 

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session




//var myRoutes = require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
//var myRoutes = require('../routes.js')(router);
app.use(myRoutes,router);
/*
// routes ======================================================================
//app.use('/', indexRouter); 
//require('./app/routes.js', router);
//require('./app/routes')(app);
app.use('/', myRoutes);
app.use('/about', myRoutes);
app.use('/contact', myRoutes);
app.use('/crop', myRoutes);
app.use('/dashboard', myRoutes);
app.use('/data', myRoutes);
app.use('/events', myRoutes);
app.use('/harvest', myRoutes);
app.use('/harvest_create', myRoutes);
app.use('/harvest_delete', myRoutes);
app.use('/harvest_edit', myRoutes);
app.use('/login', myRoutes);
app.use('/logout', myRoutes);
app.use('/signup', myRoutes);
app.use('/task', myRoutes);
app.use('/task_create', myRoutes);
app.use('/task_delete', myRoutes);
app.use('/task_edit', myRoutes);
app.use('/users', myRoutes);
app.use('/weather', myRoutes); */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// launch ======================================================================
//app.listen(port);
//console.log('The magic happens on port ' + port);



module.exports = app;
