var express = require('express');
var router = express.Router();

/* GET Weather page. */
router.get('/', function(req, res, next) {
  res.render('weather', { title: 'The Garden App local Weather page' });
});

module.exports = router;
