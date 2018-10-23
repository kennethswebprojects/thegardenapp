var express = require('express');
var router = express.Router();

/* GET Harvest page. */
router.get('/', function(req, res, next) {
  res.render('harvest', { title: 'The Garden App Harvest list page' });
});

module.exports = router;
