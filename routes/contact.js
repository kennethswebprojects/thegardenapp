var express = require('express');
var router = express.Router();

/* GET Contact us page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact The Garden App' });
});

module.exports = router;
