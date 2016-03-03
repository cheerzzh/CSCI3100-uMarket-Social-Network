var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('/routes');
});

router.get('/contact', function(req, res, next) {
   // Render a view
   //res.render('contact');
   res.send('contact');
});

router.get('/test', function(req, res,next) {
   // Render a view
   //res.render('contact');
   //res.render('index', { title: 'test' });
   res.send('test');
});

router.get('/:id', function(req, res,next) {
   // Render a view
   //res.render('contact');
   //res.render('index', { title: 'test' });
   res.send('/route1/' + req.params.id);
});

module.exports = router;
