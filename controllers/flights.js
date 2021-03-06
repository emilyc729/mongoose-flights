var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index, 
    show
}

function newFlight(req, res) {
    res.render('flights/new', {title: 'Create New Flight'});
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
        res.render('flights/index', {title: 'Flights List', flights: flights }
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
        var optionsArr = ['AUS', 'LAX', 'DAL', 'SEA'];
        optionsArr.splice(optionsArr.indexOf(flight.airport),1);
        
       flight.destinations.forEach(function(d) {
            optionsArr.splice(optionsArr.indexOf(d.airport), 1);
       });
    
        Ticket.find({flight: flight._id}, function(err, tickets){
            console.log(tickets);
            res.render('flights/show',{title: 'Flight Details', flight, tickets, optionsArr});
        });
        console.log(flight);
    
       /*
       res.render('flights/show',{title: 'Flight Detail', flight});
        console.log(flight);
            */
    });
    

}