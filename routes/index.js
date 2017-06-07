var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TicketOffice' });
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Detail' });
});

router.get('/payment', function(req,res,next) {
  res.render('payment', { title:'Payment' });
});

module.exports = router;
