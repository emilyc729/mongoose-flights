var Flight = require('../models/flight');

module.exports = {
    create
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        if(err) res.render(`/flights/${flight._id}`);
        if(req.body.airport !== flight.airport) {
            flight.destinations.push(req.body);
        }
        flight.destinations.sort(function(a, b) {
            return a.arrival - b.arrival;
        });
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}