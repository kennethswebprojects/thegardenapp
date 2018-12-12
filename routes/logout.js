const express = require('express');
const router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('logout', { title: 'The Garden App Harvest logout page' });
});

module.exports = router;
