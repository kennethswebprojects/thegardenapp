const express = require('express');
const router = express.Router();

/* GET Crop Scheduler page. */
router.get('/', function(req, res, next) {
  res.render('crop', { title: 'The Garden App Crop Scheduler' });
});

module.exports = router;
