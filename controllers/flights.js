const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
module.exports ={
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight
}
function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {title: 'All Flights', flights});
    });
}
function newFlight(req, res) {
	const newFlight = new Flight();
// Obtain the default date
const dt = newFlight.departs;
// Format the date for the value attribute of the input
let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
res.render('flights/new', { departsDate });
	res.render('flights/new', { departsDate });
}

function create(req, res) {
	Flight.create(req.body, function(err) {
        if (err) return res.render('flights/new')
        res.redirect('/flights')
    });
}

function show(req, res) {
	Flight.findById(req.params.id, function(err, flight) {
		Ticket.find({ flight: flight._id }, function(err, tickets) {
			res.render('flights/show', {
				flight,
				tickets
			});
		});
	});
}

function deleteFlight(req, res) {
	Flight.findByIdAndRemove(req.params.id, function(err, flight) {
		res.redirect('/');
	});
}
