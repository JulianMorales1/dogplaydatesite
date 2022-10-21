const mongoose = require('mongoose');

const connectionString =
	'mongodb+srv://JulianMorales:ezpassword@cluster0.skdcvj1.mongodb.net/datebase?retryWrites=true&w=majority';
const connectDB = async () => {
	const conn = await mongoose.connect(connectionString, {
		
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
