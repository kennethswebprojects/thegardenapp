const express = require('express');
const router = express.Router();

/* GET Harvest create page. */

router.get('/', function(req, res, next) {
  res.render('harvest_create', { title: 'Create a Harvest list item' });
});
module.exports = router;
