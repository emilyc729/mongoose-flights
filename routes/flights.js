var express = require('express');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');
/* GET home page. */
router.get('/new', flightsCtrl.new);
router.get('/', flightsCtrl.index);
// GET /flights/:id -> show.ejs
router.get('/:id', flightsCtrl.show);


router.post('/', flightsCtrl.create);
module.exports = router;
