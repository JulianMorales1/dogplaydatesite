const mongoose = require('mongoose');

const playDateSc = new mongoose.Schema({
	date: Date,
	sender: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	recievers: [String],
});

module.exports = mongoose.model('PlayDateRequest', playDateSc);
