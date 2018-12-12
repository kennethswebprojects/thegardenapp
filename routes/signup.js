const express = require('express');
const router = express.Router();

/* GET Register page. */
router.get('/', function (req, res, next) {
    res.render('signup.pug', {title: 'The Garden App Harvest Registration page'});
});

module.exports = router;
