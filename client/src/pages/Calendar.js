import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import BookingCalendar from 'react-booking-calendar';

import '../styles/Calendar.css';
// const bookings = [
// 	new Date(2016, 7, 1),
// 	new Date(2016, 7, 2),
// 	new Date(2016, 7, 3),
// 	new Date(2016, 7, 9),
// 	new Date(2016, 7, 10),
// 	new Date(2022, 10, 11),
// 	new Date(2022, 9, 12),
// ];

const Calendar = () => {
	const user = useSelector((state) => state.user.user);
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(
				process.env.REACT_APP_URL + '/calendar/' + user.email
			);
			const json = await response.json();

			console.log(json);
			if (json.success) {
				console.log('bookings>>>>', json.data);
				let jsonBookings = json.data.map((b) => {
					let date = new Date(b.date);
					return date;
				});
				setBookings((prev) => {
					return [...jsonBookings];
				});
			}
		})();
	}, []);
	return (
		<div className='calendar'>
			<h3>Bookings</h3>
			<BookingCalendar bookings={bookings} />
		</div>
	);
};

export default Calendar;
