var express = require('express');
var router = express.Router();

/* GET Task List page. */
router.get('/', function(req, res, next) {
  res.render('task', { title: 'Task list page' });
});

module.exports = router;
