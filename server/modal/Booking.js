const mongoose = require('mongoose');
const BookingSc = new mongoose.Schema({
	date: Date,
	senderEmail: String,
	recieverEmail: String,
});

module.exports = mongoose.model('Booking', BookingSc);
