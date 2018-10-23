var express = require('express');
var router = express.Router();

/* GET Crop Scheduler page. */
router.get('/', function(req, res, next) {
  res.render('crop', { title: 'The Garden App Crop Scheduler' });
});

module.exports = router;
