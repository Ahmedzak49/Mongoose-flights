const Ticket = require('../models/ticket');

module.exports = {
	new: newTicket,
	create,
	delete: deleteTicket
};

function newTicket(req, res) {
    let flightId = req.params.id;
	res.render('tickets/new', { flightId });
}

function create(req, res) {
	req.body.flight = req.params.id;
	Ticket.create(req.body, function(err, ticket) {
		res.redirect(`/flights/${req.params.id}`);
	});
}

function deleteTicket(req, res) {
	Ticket.findById(req.params.id).populate('flight').exec(function(err, ticket) {
		Ticket.findByIdAndDelete(req.params.id, function(err) {
			console.log(`deleting: ${ticket}`);
			res.redirect(`/flights/${ticket.flight._id}`);
		});
	});
}
