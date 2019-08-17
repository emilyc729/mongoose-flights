var express = require('express');
var router = express.Router();
var ticketsCtrl = require('../controllers/tickets');

//GET
router.get('/flights/:id/tickets/new', ticketsCtrl.new);

//POST
router.post('/flights/:id/tickets', ticketsCtrl.create);
module.exports = router;