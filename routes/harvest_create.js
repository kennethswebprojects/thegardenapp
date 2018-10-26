var express = require('express');
var router = express.Router();

/* GET Harvest create page. */

router.get('/', function(req, res, next) {
  res.render('harvest_create', { title: 'Create a Harvest list item' });
});
module.exports = router;
