var express = require('express');
var router = express.Router();

/* GET Events Calendar page. */
router.get('/', function(req, res, next) {
  res.render('events', { title: 'The Garden App Events Calendar page' });
});

module.exports = router;
