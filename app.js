var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://thegardenappuser:sh4re4ble@ds231070.mlab.com:31070/thegardenapp';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var cropRouter = require('./routes/crop');
var dashboardRouter = require('./routes/dashboard');
var dataRouter = require('./routes/data');
var eventsRouter = require('./routes/events');

var harvestRouter = require('./routes/harvest');
var harvest_createRouter = require('./routes/harvest_create');
var harvest_deleteRouter = require('./routes/harvest_delete');
var harvest_editRouter = require('./routes/harvest_edit');

var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');

var taskRouter = require('./routes/task');
var task_createRouter = require('./routes/task_create');
var task_deleteRouter = require('./routes/task_delete');
var task_editRouter = require('./routes/task_edit');
var usersRouter = require('./routes/users');
var weatherRouter = require('./routes/weather');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/crop', cropRouter);
app.use('/dashboard', dashboardRouter);
app.use('/data', dataRouter);
app.use('/events', eventsRouter);
app.use('/harvest', harvestRouter);
app.use('/harvest_create', harvest_createRouter);
app.use('/harvest_delete', harvest_deleteRouter);
app.use('/harvest_edit', harvest_editRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/task', taskRouter);
app.use('/task_create', task_createRouter);
app.use('/task_delete', task_deleteRouter);
app.use('/task_edit', task_editRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRouter);


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

module.exports = app;
