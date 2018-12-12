const express = require('express');
const router = express.Router();

/* GET Task List page. */
router.get('/', function (req, res, next) {
    res.render('profile', {title: 'Profile page'});
});

module.exports = router;
