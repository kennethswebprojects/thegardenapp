var express = require('express');
var router = express.Router();

/* GET Harvest create page. */

router.get('/', function(req, res, next) {
  res.render('harvest', { title: 'View Harvest list' });
});
module.exports = router;
