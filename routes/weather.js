let express = require('express');
let router = express.Router();
//let request = require('request');
/* GET Weather page. */
//  ?apikey=5ede394648df55cf729a5eea87777090
//let url    = 'https://api.darksky.net/forecast/5ede394648df55cf729a5eea87777090';
router.get('/', function(req, res, next) {
    res.render('weather.pug', {title: 'Weather page'});
});

module.exports = router;

//weatheriframe.pug