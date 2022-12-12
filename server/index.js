const express = require('express');
const app = express();
const User = require('./modal/User');
const connectDB = require('./db');
const cors = require('cors');
const Dog = require('./modal/Dog');
const Comment = require('./modal/Comment');
const Booking = require('./modal/Booking');

const PlayDateRequest = require('./modal/PlayDateRequest');
const formidable = require('formidable');
const path = require('path');

const fileUpload = require('express-fileupload');
const multer = require('multer');

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// file uploading
app.use(fileUpload());

app.listen(4000, () => console.log('Server is Running'));

// Set static folder
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', express.static('public'))
app.post('/api/SignUp', async (req, res) => {
	console.log(req.body);
	const user = await User.create(req.body);
	if (user) {
		res.status(200).json({
			success: true,
			data: user,
		});
	}
});

app.post('/api/signin', async (req, res) => {
	console.log(req.body);
	const user = await User.find({
		email: req.body.email,
		password: req.body.password,
	});
	if (user) {
		res.status(200).json({
			success: true,
			data: user,
		});
	}
});

// get list of existing users

app.get('/api/users/:excludedUser', async (req, res) => {
	const users = await User.find();

	const filtered = users.filter(
		(user) => user.email !== req.params.excludedUser
	);
	console.log(filtered);
	res.status(200).json({
		success: true,
		data: filtered,
	});
});

// Hanlder Friend Request

app.post('/api/send_friend_request', async (req, res) => {
	const { sender, reciever } = req.body;
	const user = await User.findOne({
		email: reciever,
	});
	const friendReqs = [...user.FriendRequests];
	friendReqs.push(sender);
	const updated = await User.findByIdAndUpdate(user._id, {
		FriendRequests: friendReqs,
	});

	// updating sender data
	const senderOfRequest = await User.findOne({
		email: sender,
	});

	const sentRequests = [...senderOfRequest.sentRequests];
	console.log('before', sentRequests);
	sentRequests.push(reciever);
	console.log('after', sentRequests);
	const updatedSender = await User.findByIdAndUpdate(senderOfRequest._id, {
		sentRequests: sentRequests,
	});
	console.log(user);
	res.status(200).json({
		success: true,
	});
});

app.post('/api/accept_friend_request', async (req, res) => {
	const { acceptor_email, acceptor_id, sender_email } = req.body;
	const acceptor = await User.findOne({
		email: acceptor_email,
	});

	let friendReqs = [...acceptor.FriendRequests];
	friendReqs = friendReqs.filter((fr) => fr !== sender_email);
	let friends = [...acceptor.Friends];
	friends.push(sender_email);

	const updatedAcceptor = await User.findByIdAndUpdate(acceptor._id, {
		Friends: friends,
		FriendRequests: friendReqs,
	});

	//sender now

	const sender = await User.findOne({
		email: sender_email,
	});

	const senderFriends = [...sender.Friends];
	senderFriends.push(acceptor.email);
	const updatedSender = await User.findByIdAndUpdate(sender._id, {
		Friends: senderFriends,
	});

	res.status(200).json({
		success: true,
	});
});

//accept_friend_request
// Inserting dogs in Dtabase

app.post('/api/dogs/:userid', async (req, res, next) => {
	// const { user, dog } = req.body;

	const dog = {
		name: req.body.name,
		breed: req.body.breed,
		dateOfBirth: req.body.dateOfBirth,
	};
	console.log(req.body);
	const file = req.files.file;

	//./public/uploads

	dog['user'] = req.params.userid;
	dog['ext'] = path.parse(file.name).ext;

	const createdDog = await Dog.create(dog);

	// Create custom filename
	file.name = `photo_${createdDog._id}${path.parse(file.name).ext}`;

	file.mv(`./public/uploads/${file.name}`, async (err) => {
		if (err) {
			console.error(err);
		}

		res.status(200).json({
			success: true,
			data: createdDog,
		});
	});

	// if (createdDog) {
	// 	res.status(201).json({
	// 		success: true,
	// 		data: createdDog,
	// 	});
	// } else {
	// 	res.status(400).json({
	// 		success: false,
	// 		message: 'Dog was not created!',
	// 	});
	// }
});

app.put('/api/dogs/:id', async (req, res) => {
	const { user, dog } = req.body;
	// const existingUser = await User.find({
	//     email:req.body.email,password:req.body.password
	//    })

	if (false) {
		res.status(400).json({
			success: false,
			message: 'user credentials not correct!',
		});
	} else {
		dog['user'] = user._id;
		const updatedDog = await Dog.findByIdAndUpdate(req.params.id, dog);

		if (updatedDog) {
			res.status(201).json({
				success: true,
				data: updatedDog,
			});
		} else {
			res.status(400).json({
				success: false,
				message: 'Dog was not updated!',
			});
		}
	}
});

app.delete('/api/dogs/:id', async (req, res) => {
	//const {user,dog} = req.body;
	// const existingUser = await User.find({
	//     email:req.body.email,password:req.body.password
	//    })

	if (false) {
		res.status(400).json({
			success: false,
			message: 'user credentials not correct!',
		});
	} else {
		//dog['user']=user._id;
		const deletedDog = await Dog.findByIdAndDelete(req.params.id);

		if (deletedDog) {
			res.status(201).json({
				success: true,
				message: 'deleted',
			});
		} else {
			res.status(400).json({
				success: false,
				message: 'Dog was not deleted!',
			});
		}
	}
});

// get dogs
app.get('/api/dogs/:userId', async (req, res) => {
	// const existingUser = await User.find({
	//     email:req.params.email,password:req.params.password
	//    })

	if (false) {
		res.status(400).json({
			success: false,
			message: 'user credentials not correct!',
		});
	} else {
		const allDogs = await Dog.find({
			user: req.params.userId,
		});

		const updatedDogs = allDogs.map((dog) => {
			dog.photo = '/api/uploads/photo_' + dog._id + dog.ext;
			return dog;
		});
		console.log(updatedDogs);
		if (allDogs) {
			res.status(200).json({
				success: true,
				data: updatedDogs,
			});
		} else {
			res.status(400).json({
				success: false,
				message: 'No Dog was found!',
			});
		}
	}
});

// get dogs
app.get('/api/all_posts/:useremail', async (req, res) => {
	// const existingUser = await User.find({
	//     email:req.params.email,password:req.params.password
	//    })

	if (false) {
		res.status(400).json({
			success: false,
			message: 'user credentials not correct!',
		});
	} else {
		const allDogs = await Dog.find().populate('user');

		const filtered = allDogs.filter((dog) => {
			if (dog.user.Friends.includes(req.params.useremail)) {
				return dog;
			}
		});

		console.log(filtered);

		const comments = await Comment.find();

		let newDogs = [];

		for (const dog of filtered) {
			let newDog = {
				_id: dog._id,
				name: dog.name,
				breed: dog.breed,
				dateOfBirth: dog.dateOfBirth,
				ext: '.jpeg',
				user: {
					_id: dog.user._id,
					email: dog.user.email,
					FriendRequests: dog.user.FriendRequests,
					Friends: dog.user.Friends,
					sentRequests: dog.user.sentRequests,
				},
			};
			newDog['photo'] = '/api/uploads/photo_' + dog._id + dog.ext;

			const filteredComments = comments.filter((c) => {
				if (c.dog._id.toString() === newDog._id.toString()) {
					return c;
				}
			});
			newDog['comments'] = filteredComments;
			newDogs.push(newDog);
		}

		// get comments

		if (allDogs) {
			res.status(200).json({
				success: true,
				data: newDogs,

				// updated: newDogs
			});
		} else {
			res.status(400).json({
				success: false,
				message: 'No Dog was found!',
			});
		}
	}
});

// handling comments

app.post('/api/comments', async (req, res) => {
	const createdComment = await Comment.create(req.body);

	if (createdComment) {
		res.status(201).json({
			success: true,
		});
	} else {
		res.status(400).json({
			success: false,
		});
	}
});

// Managing Play Date Requests

app.post('/api/play_date_request', async (req, res) => {
	const pdr = await PlayDateRequest.create(req.body);
	if (pdr) {
		res.status(201).json({
			success: true,
		});
	} else {
		req.status(400).json({
			success: false,
		});
	}
});

// get play list request list

app.get('/api/play_date_request/:useremail', async (req, res) => {
	const allRequests = await PlayDateRequest.find().populate('sender');

	const filtered = allRequests.filter((pdr) => {
		if (pdr.recievers.includes(req.params.useremail)) {
			return pdr;
		}
	});

	res.status(200).json({
		success: true,
		data: filtered,
	});
});

// accept playdate request

app.post('/api/accept_play_date_request', async (req, res) => {
	// body: JSON.stringify({
	// 	id: e.target.value,
	// 	sender: senderEmail,
	// 	reciever: user.email,
	// 	date:date
	// }),

	// const BookingSc = new mongoose.Schema({
	// 	date: Date,
	// 	senderEmail: String,
	// 	recieverEmail: String,
	// });

	const { id, sender, reciever, date } = req.body;

	const result = await PlayDateRequest.findByIdAndDelete(id);

	const booking = await Booking.create({
		date: new Date(date),
		senderEmail: sender,
		recieverEmail: reciever,
	});

	if (booking) {
		res.status(201).json({
			success: true,
		});
	} else {
		res.status(400).json({
			success: false,
			message: 'not able to create booking',
		});
	}
});

// get Calandar

app.get('/api/calendar/:useremail', async (req, res) => {
	// const bookingsAsSender = await Booking.find({
	// 	senderEmail: req.params.useremail,
	// });
	// const bookingsAsReciever = await Booking.find({
	// 	recieverEmail: req.params.useremail,
	// });

	console.log('here');
	const allBookings = await Booking.find();

	const filtered = await allBookings.filter((b) => {
		if (
			b.senderEmail === req.params.useremail ||
			b.recieverEmail === req.params.useremail
		) {
			return b;
		}
	});

	// let finalBookings = bookingsAsSender.concat(bookingsAsReciever);

	res.status(200).json({
		success: true,
		data: filtered,
	});
});
