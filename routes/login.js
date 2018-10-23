var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'The Garden App Harvest login page' });
});

module.exports = router;
