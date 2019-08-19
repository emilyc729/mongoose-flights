var Ticket = require('../models/ticket');


module.exports = {
    new: newTicket,
    create, 
    delete: removeTicket
};

function newTicket(req, res) {
    res.render('tickets/new', {title: 'Create New Ticket', flightId: req.params.id});
}

function create(req, res) {
    var ticket = new Ticket(req.body);
    ticket.flight = req.params.id;

    console.log(ticket);
    
    ticket.save(function (err) {
        res.redirect(`/flights/${req.params.id}`);
    });
    
    
}

function removeTicket(req, res) {
    console.log(req.params.id);
    Ticket.findByIdAndRemove({'_id': req.params.id}, function(err, tix) {
        //console.log(_id);
        res.redirect(`/flights/${tix.flight}`);
    })
}
