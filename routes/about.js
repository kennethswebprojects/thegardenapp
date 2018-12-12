let express = require('express');
let router = express.Router();

/* GET About page. */
router.get('/', function (req, res) {
  res.render('about', { title: 'About The Garden App' });
});

module.exports = router;
