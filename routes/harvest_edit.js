var express = require('express');
var router = express.Router();

/* GET Harvest edit page. */

router.get('/', function(req, res, next) {
  res.render('/harvest_edit', { title: 'Edit a Harvest list item' });
});
module.exports = router;
