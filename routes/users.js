const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', {title: 'The Garden App User / Staff Page'});
});

module.exports = router;
