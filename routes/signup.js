var express = require('express');
var router = express.Router();

/* GET Register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'The Garden App Harvest Registration page' });
});

module.exports = router;
