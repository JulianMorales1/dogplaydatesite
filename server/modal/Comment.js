const mongoose = require('mongoose');
const commentSc = new mongoose.Schema({
	body: String,
	userid: String,
	dogid: String,
	useremail: String,
	dog: {
		type: mongoose.Schema.ObjectId,
		ref: 'Dog',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Comment', commentSc);
