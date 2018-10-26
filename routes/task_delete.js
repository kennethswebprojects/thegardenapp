var express = require('express');
var router = express.Router();

/* GET Task List page. */
router.get('/', function(req, res, next) {
  res.render('task_delete', { title: 'Delete a task' });
});

module.exports = router;
