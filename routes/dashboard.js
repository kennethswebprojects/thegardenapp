var express = require('express');
var router = express.Router();

/* GET Dashboard page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'The Garden App Dashboard page' });
});

module.exports = router;
