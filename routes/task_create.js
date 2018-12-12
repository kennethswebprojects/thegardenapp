const express = require('express');
const router = express.Router();

/* GET Task List page. */
router.get('/', function(req, res, next) {
  res.render('task_create', { title: 'Create a Task' });
});

module.exports = router;
