let express = require('express');
//let path = require('path');
///var fs = require('fs');
//const VIEWS = path.join(__dirname, 'views');
let flash = require('connect-flash');
let mysql = require('mysql'); // allow access to sql
let morgan = require('morgan');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt-nodejs');
//let pug = require('pug');
//let cookieNotice = require("cookie-notice");

let app = express();
// view engine setup

/*
app.set('views', path.join(__dirname, './views'));
app.set('css', path.join(__dirname, './css'));
app.set('routes', path.join(__dirname, './routes'));
//app.use('css', require('./css/style.css'));
//app.use('views', require('./views/'));
//app.use('routes', require('./routes/'));

*/


app.use('/routes', express.static('routes'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));


app.set("view engine", "pug");

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
*/

app.use(cookieParser('vidyapathaisalwaysrunning'));

// required for passport
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

/*
// res.locals is an object passed to hbs engine, un-used now, was part of a cart that was to act as a payment
//gateway for produce that would be purchased through the Harvest Items section of the app.

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
*/

// ******************** Routing ********************************** /
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const cropRouter = require('./routes/crop');
const dataRouter = require('./routes/data');
const eventsRouter = require('./routes/events');
//const harvestRouter = require('./routes/harvest');
//const harvest_createRouter = require('./routes/harvest_create');
//const harvest_deleteRouter = require('./routes/harvest_delete');
//const harvest_editRouter = require('./routes/harvest_edit');
//const profileRouter = require('./routes/profile');
//const taskRouter = require('./routes/task');
//const task_createRouter = require('./routes/task_create');
//const task_deleteRouter = require('./routes/task_delete');
//const task_editRouter = require('./routes/task_edit');
//const usersRouter = require('./routes/users');
const weatherRouter = require('./routes/weather');
//const cartRouter = require('./routes/cartRouter');

app.use('/', indexRouter);
//app.use('/harvest', harvestRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/crop', cropRouter);
app.use('/data', dataRouter);
app.use('/events', eventsRouter);
//app.use('/harvest', harvestRouter);
//app.use('/harvest_create', harvest_createRouter);
//app.use('/harvest_delete', harvest_deleteRouter);
//app.use('/harvest_edit', harvest_editRouter);
//app.use('/profile', profileRouter);
//app.use('/task', taskRouter);
//app.use('/task_create', task_createRouter);
//app.use('/task_delete', task_deleteRouter);
//app.use('/task_edit', task_editRouter);
//app.use('/users', usersRouter);
app.use('/weather', weatherRouter);

// ******************** End Routing ********************************** /

// ******************** SQL Connection ********************************** //
const db = mysql.createConnection({

    host: 'den1.mysql3.gear.host',
    user: 'growerymysql',
    password: 'Ck57klP~zDB-',
    database: 'growerymysql'

});


db.connect((err) => {
    if (err) {
        console.log("Connection to Gearhost MySQL DB has been refused ... Please check login details and then try again shortly, please!");
        // throw(err)
    }
    else {
        console.log("Well done, you are connected to the mySQL DB hosted by Gearhost...");
    }
});
// ******************** End SQL Connection ********************************** //

//Connection to the Mlabs hosted MongoDB database, interfaced with Mongoose ORM. This had been set up while attempting the use of Passport/Mongoose as authentication middleware and
//an ORM to use MongoDB to take advantage of the benefits of NoSQL, however due to time management constraints, the decision was made to default to the
// more familiar MySQL.

/*
//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://thegardenappuser:sh4re4ble@ds231070.mlab.com:31070/thegardenapp';
let options = { useNewUrlParser: true };
mongoose.connect(mongoDB, options);
mongoose.Promise = global.Promise;
//var Schema = mongoose.Schema;


let M_db = mongoose.connection;
M_db.on('error', console.error.bind(console, 'MongoDB connection error:'));

*/


// ******************** Harvest CRUD ********************************** /
// Render harvest page
app.get('/harvest', function (req, res) {

    let sqlHA = 'SELECT * FROM Harvest;';
    let query = db.query(sqlHA, (err, resHA) => {
        if (err) throw err;
        console.log(resHA);

        res.render('harvest', {resHA});
        console.log("Now you are on the harvest page and can view all of the harvest items that are available!");
    });
});

// ***** Create a page for the create new harvest item page
app.get('/harvest_create', function (req, res) {
    res.render('harvest_create');
    console.log("Create a Harvest list item page!");
});

// ***** Create and post new harvest item to database
app.post('/harvest_create', function (req, res) {
    let sqlHC = 'INSERT INTO Harvest (Username, Type, Price, Description, Harvestweight, Harvestunits) VALUES ("' + req.body.username + '", "' + req.body.type + '", "' + req.body.price + '", "' + req.body.description + '", "' + req.body.harvestweight + '", "' + req.body.harvestunits + '");';
    let query = db.query(sqlHC, (err, resHC) => {
        if (err) throw err;
        console.log(resHC);

    });
    res.redirect("/harvest");
});

// Show individual Harvest item page
app.get('/harvest_item/:id', function (req, res) {
    let sqlHI = 'SELECT * FROM Harvest WHERE Id = "' + req.params.id + '";';

    let query = db.query(sqlHI, (err, resHI) => {
        if (err) throw err;
        console.log(resHI);

        res.render('harvest_item', {resHI}); // This will render the harvest_item.pug page for us
    });

    console.log("View the harvest item ");

});

// Edit harvest item form

app.get('/harvest_edit/:id', function (req, res) {
    let sqlHE = 'SELECT * FROM Harvest WHERE Id = "' + req.params.id + '";';
    let query = db.query(sqlHE, (err, resHE) => {
        if (err) throw err;
        console.log(resHE);
        console.log(this.sql);
        res.render('harvest_edit', {id: +req.params.id, resHE}); // This will render the harvest_edit page for us
    });

    console.log("That worked");

});


// ***** Post edited harvest item to database

app.post('/harvest_edit/:id', function (req, res) {
    //let sql = 'UPDATE harvest SET Name = "' + req.body.name + '", Price = "' + req.body.price + '", Activity = "' + req.body.activity + '", Image = "' + req.body.image + '" WHERE Id = "' + req.params.id + '";';
    let sqlHE = 'UPDATE Harvest SET Username = "' + req.body.username + '", Type = "' + req.body.type + '", Price = "' + req.body.price + '", Description = "' + req.body.description + '", Harvest weight = "' + req.body.harvestweight + '"kg, Harvestunits = "' + req.body.harvestunits + '" WHERE Id = "' + req.params.id + '";';
    let query = db.query(sqlHE, (err, resHE) => {
        if (err) throw err;
        console.log(resHE);
        console.log(this.sql)

    });
    console.log("Harvest item edited");
    res.redirect("/harvest");
});


// Delete harvest item

app.get('/harvest_delete/:id', function (req, res) {
    let sql = 'DELETE FROM harvest WHERE Id = "' + req.params.id + '" ; ';
    let query = db.query(sql, (err, res2) => {
        if (err) throw err;
        console.log(res2);

        res.redirect('/harvest'); // This will render the index.jade page for us
    });
    console.log("Harvest item deleted");

});


// ******************** Task list CRUD ********************************** /
// Render task page
app.get('/task', function (req, res) {

    let sqlTA = 'SELECT * FROM task;';
    let query = db.query(sqlTA, (err, resTA) => {
        if (err) throw err;
        console.log(resTA);

        res.render('task', {resTA});
        console.log("Now you are on the task page and can view all of the task items that are available!");
    });
});


// ***** Post new task item to database
app.get('/task_create', function (req, res) {

    res.render('task_create');

    console.log("Create a task list post !");
});

app.post('/task_create', function (req, res) {
    let sqlTC = 'INSERT INTO task (Username, Type, Description) VALUES ("' + req.body.username + '", "' + req.body.type + '", "' + req.body.description + '");';
    let query = db.query(sqlTC, (err, resTC) => {
        if (err) throw err;
        console.log(resTC);

    });
    res.redirect("/task");
});

// Show individual Task item page
app.get('/task_item/:id', function (req, res) {
    let sqlTI = 'SELECT * FROM task WHERE Id = "' + req.params.id + '";';

    let query = db.query(sqlTI, (err, resTI) => {
        if (err) throw err;
        console.log(resTI);

        res.render('task_item', {resTI}); // This will render the harvest_item.pug page for us
    });

    console.log("View the task item ");

});

// Edit task item

app.get('/task_edit/:id', function (req, res) {
    let sqlET = 'SELECT * FROM task WHERE Id = "' + req.params.id + '";';

    let query = db.query(sqlET, (err, resET) => {
        if (err) throw err;
        console.log(resET);
        console.log(this.sql);
        res.render('task_edit', {resET}); // This will render the individual task.pug page for us
    });

    console.log("View the task item ");

});

// ***** Post new task to database

app.post('/task_create/:id', function (req, res) {

    let sqlTC = 'UPDATE task SET Username = "' + req.body.username + '", Type = "' + req.body.type + '", "Description = "' + req.body.description + '";';
    let query = db.query(sqlTC, (err, resTC) => {
        if (err) throw err;
        console.log(resTC);


    });
    console.log("Task item edited");
    res.redirect("/task");
});


// Delete task item

app.get('/task_delete/:id', function (req, res) {
    let sqlTD = 'DELETE FROM task WHERE Id = "' + req.params.id + '" ; ';
    let query = db.query(sqlTD, (err, resTD) => {
        if (err) throw err;
        console.log(resTD);

        res.redirect('/task'); // This will render the task.pug page for us after having deleted the previous task item
    });

    console.log("Task item deleted");

});


/* GET users listing. */


app.get('/users', function (req, res) {

    let sql = 'SELECT * FROM users;';
    let query = db.query(sql, (err, resUsers) => {
        if (err) throw err;
        console.log(resUsers);

        res.render('users', {resUsers});
        console.log("Now you are on the Users and can view all of the Users that are registered!");
    });
});
// --------------------------------------------------------- Authenthication, protected routes, Passport strategies and the following redirection ------------------------------------------------------------ //

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
app.get('/login', function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login', {message: req.flash('loginMessage')});
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        //console.log("Successful login"),
        failureRedirect: '/login', // redirect back to the login page if there is an error
        failureFlash: true // allow flash messages
    }),
    function (req, res) {
        console.log("hello");
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', {message: req.flash('signupMessage')});
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        user: req.user // get the user out of session and pass to template
    });
});

// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    console.log('serializeUser: ' + user.Id);
    done(null, user.Id); // Very important to ensure the case if the Id from your database table is the same as it is here
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {
    db.query("SELECT * FROM users WHERE Id = ? ", [id], function (err, rows) {
        done(err, rows[0]);
    })
});

/*
passport.deserializeUser(function(id, done) {
    db.users.findById(id, function(err, user){
        console.log(user)
        if(!err) done(null, user);
        else done(err, null)
    })
});
*/

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================


passport.use(
    'local-signup',
    new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            db.query("SELECT * FROM users WHERE Username = ?", [username], function (err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    const newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    const insertQuery = "INSERT INTO users ( Username, Email, Password ) values (?,'kenko@kenkozilla.com', ?)";

                    db.query(insertQuery, [newUserMysql.username, newUserMysql.Password], function (err, rows) {
                        newUserMysql.Id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
);

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use(
    'local-login',
    new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) { // callback with email and password from our form
            db.query("SELECT * FROM users WHERE Username = ?", [username], function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].Password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
);


// ******************** End Passport section ********************************** //

app.get('/dashboard', isLoggedIn, function (req, res) {
    res.render('dashboard', {
        user: req.user // get the user out of session and pass to template

    });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
