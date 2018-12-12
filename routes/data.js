const express = require('express');
const router = express.Router();

/* GET Data / IoT page. */
router.get('/', function(req, res, next) {
  res.render('data', { title: 'The Garden App Data / IoT page' });
});

module.exports = router;
