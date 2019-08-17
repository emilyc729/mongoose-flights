var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index, 
    show
}

function newFlight(req, res) {
    res.render('flights/new');
}

function create(req, res) {
    for(let key in req.body) {
        if(req.body[key] === '') delete req.body[key];
    }
    var flight = new Flight(req.body);
    flight.save(function (err) {
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights');
    });

}

function index(req, res) {
    Flight.find(function (err, flights) {
        if (err) return res.render('flights/index');
        res.render('flights/index',
            {flights: flights }
        );
    }).sort('departs');
    /*
    Flight.findOneAndDelete({departs: null}, function(err){
        if (err) return res.render('flights/index');
    });
    */
    
}

function show(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        if (err) return res.render('flights/index');
        Ticket.find({flight: flight._id}, function(err, tickets){
            console.log(tickets);
            res.render('flights/show',{title: 'Flight Detail', flight, tickets});
        });
    
        /*
        flight.destinations.find(
            {_id: {$nin: }}
        )
        */
       /*
       res.render('flights/show',{title: 'Flight Detail', flight});
        console.log(flight);
            */
    });
}