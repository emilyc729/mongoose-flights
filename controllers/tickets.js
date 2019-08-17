var Ticket = require('../models/ticket');


module.exports = {
    new: newTicket,
    create
};

function newTicket(req, res) {
    res.render('tickets/new', {flightId: req.params.id});
}

function create(req, res) {
    var ticket = new Ticket(req.body);
    ticket.flight = req.params.id;

    console.log(ticket);
    
    ticket.save(function (err) {
        res.redirect(`/flights/${req.params.id}`);
    });
    
    
}
