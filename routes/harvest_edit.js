const express = require('express');
const router = express.Router();

/* GET Harvest edit page. */

router.get('/', function(req, res, next) {
  res.render('/harvest_edit', { title: 'Edit a Harvest list item' });
});
module.exports = router;
