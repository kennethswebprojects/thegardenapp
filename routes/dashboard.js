var express = require('express');
var router = express.Router();

/* GET Dashboard page. */
router.get('/dashboard', function(req, res, next) {
        res.render('dashboard.pug', { title: 'The Garden App Dashboard page'
        });
});


module.exports = router;
