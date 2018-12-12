const express = require('express');
const router = express.Router();

/* GET Harvest delete page. */


router.get('/', function(req, res, next) {
  res.render('/harvest_delete', { title: 'Delete a Harvest list item' });
});
module.exports = router;
