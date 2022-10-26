const mongoose = require('mongoose');

const dogSc = new mongoose.Schema({
	name: String,
	breed: String,
	dateOfBirth: String,
	picture: String,
	ext: String,
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

dogSc.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'dog',
	justOne: false,
});

module.exports = mongoose.model('Dog', dogSc);
