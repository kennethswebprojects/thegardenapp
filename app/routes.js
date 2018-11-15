// app/routes.js
var express = require('express');
var router = express.Router();
//var router = require('express').Router();
//const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);
//var app = require('../app');
//var passport = require('../config/passport');

//module.exports = function(app, passport) {
module.exports = function(app, passport) {
  
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    router.get('/', function(req, res) {
        res.render('../views/index.pug'); // load the index.pug file
    });

    // =====================================
    // ABOUT PAGE ==========================
    // =====================================
    router.get('/about', function(req, res) {
        res.render('../views/about.pug', { title: 'About The Garden App' });
    });
    
    // =====================================
    // CONTACT US PAGE =====================
    // =====================================
    router.get('/contact', function(req, res) {
        res.render('contact.pug', { title: 'Contact The Garden App' });
    });
    
    // =====================================
    // CROP PAGE ===========================
    // =====================================
    router.get('/crop', function(req, res) {
        res.render('crop.pug', { title: 'Crop Scheduler The Garden App' });
    });
    
    // =====================================
    // DASHBOARD PAGE ======================
    // =====================================
    router.get('/dashboard', function(req, res) {
        res.render('dashboard.pug', { title: 'Dashboard The Garden App' });
    });
    
    // =====================================
    // EVENTS PAGE =========================
    // =====================================
    router.get('/events', function(req, res) {
        res.render('events.pug', { title: 'Events Calendar The Garden App' });
    });
    
    // =====================================
    // TASK LIST PAGE ======================
    // =====================================
    router.get('/task', function(req, res) {
        res.render('task.pug', { title: 'Task List The Garden App' });
    });
    
    router.get('/task_create', function(req, res) {
        res.render('task_create.pug', { title: 'Create Task List Post The Garden App' });
    });
    
    router.get('/task_delete', function(req, res) {
        res.render('task_delete.pug', { title: 'Delete Task List Post The Garden App' });
    });
    
    router.get('/task_edit', function(req, res) {
        res.render('task_edit.pug', { title: 'Edit Task List The Garden App' });
    });
    // =====================================
    // HARVEST LIST PAGE ===================
    // =====================================
    router.get('/harvest', function(req, res) {
        res.render('harvest.pug', { title: 'Harvest List The Garden App' });
    });
    
    router.get('/harvest_create', function(req, res) {
        res.render('harvest_create.pug', { title: 'Harvest List Create Post The Garden App' });
    });
    
    router.get('/harvest_delete', function(req, res) {
        res.render('harvest_delete.pug', { title: 'Harvest List Delete Post The Garden App' });
    });
    
    router.get('/harvest_edit', function(req, res) {
        res.render('harvest_edit.pug', { title: 'Harvest List Edit Post The Garden App' });
    });
    // =====================================
    // USERS PAGE =========================
    // =====================================
    router.get('/users', function(req, res) {
        res.render('users.pug', { title: 'Users / Staff Page The Garden App' });
    });
    
    
    // =====================================
    // DATA / IoT PAGE =====================
    // =====================================
    router.get('/data', function(req, res) {
        res.render('data.pug', { title: 'Data / IoT Page The Garden App' });
    });
    
    // =====================================
    // WEATHER PAGE =====================
    // =====================================
    router.get('/weather', function(req, res) {
        res.render('weather.pug', { title: 'Weather Page The Garden App' });
    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        //res.render('login.pug', { message: req.flash('loginMessage') });
        res.render('login.pug', { title: 'Login Page The Garden App' }); 
    });

//    router.get('/login', function(req, res, next) {
//      passport.authenticate('local-login', function(err, user, info) {
//        if (err) { return next(err); }
//        if (!user) { return res.redirect('/login'); }
//        req.logIn(user, function(err) {
//          if (err) { return next(err); }
//          return res.redirect('/users/' + user.username);
//        });
//      })(req, res, next);
//    });

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        //res.render('signup.pug', { message: req.flash('signupMessage') });
        res.render('signup.pug', { title: 'Signup Page The Garden App' });
    });

    
    // process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.pug', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    
};

var myRoutes = require('../app.js');//(app, passport);
    router.use('/', myRoutes);
    router.use('/about', myRoutes);
    router.use('/contact', myRoutes);
    router.use('/crop', myRoutes);
    router.use('/dashboard', myRoutes);
    router.use('/data', myRoutes);
    router.use('/events', myRoutes);
    router.use('/harvest', myRoutes);
    router.use('/harvest_create', myRoutes);
    router.use('/harvest_delete', myRoutes);
    router.use('/harvest_edit', myRoutes);
    router.use('/login', myRoutes);
    router.use('/logout', myRoutes);
    router.use('/signup', myRoutes);
    router.use('/task', myRoutes);
    router.use('/task_create', myRoutes);
    router.use('/task_delete', myRoutes);
    router.use('/task_edit', myRoutes);
    router.use('/users', myRoutes);
    router.use('/weather', myRoutes);
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;