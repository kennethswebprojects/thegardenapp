var express = require('express');
var router = express.Router();

/* GET Data / IoT page. */
router.get('/', function(req, res, next) {
  res.render('data', { title: 'The Garden App Data / IoT page' });
});

module.exports = router;
