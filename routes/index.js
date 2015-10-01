var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/items');
var items = db.get('items');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/api/items', function(req, res) {
  items.insert(req.body, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(data);
  });
});

router.put('/api/items/:id', function(req, res) {
  items.findAndModify({_id: req.params.id}, req.body, function(err, data) {
    if (err) {
      throw err
    }
    res.json(req.body);
  });
});


router.get('/api/items/:id', function(req, res) {
  items.findOne({_id: req.params.id}, function(err, data) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(data);
  });
});

router.get('/api/items', function(req, res) {
  items.find({}, function(err, data) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(data);
  });
});

router.delete('/api/items/:id', function(req, res) {
  items.remove({_id: req.params.id}, function(err, data) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(data);
  });
})


module.exports = router;
