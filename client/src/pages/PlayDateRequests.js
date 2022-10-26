import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PlayDateRequests = () => {
	const user = useSelector((state) => state.user.user);

	const navigate = useNavigate();

	const [reqs, setReqs] = useState([]);

	const acceptRequest = async (e) => {
		const senderEmail = e.target.getAttribute('sender');
		const date = e.target.getAttribute('date');

		const response = await fetch(
			process.env.REACT_APP_SERVER_URL + '/accept_play_date_request/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					id: e.target.id,
					sender: senderEmail,
					reciever: user.email,
					date: date,
				}),
			}
		);

		const json = await response.json();

		if (json.success) {
			navigate('/calendar');
		}
	};

	useEffect(() => {
		(async () => {
			const response = await fetch(
				process.env.REACT_APP_SERVER_URL + '/play_date_request/' + user.email
			);
			const json = await response.json();

			setReqs((prev) => {
				return [...json.data];
			});
		})();
	}, []);

	return (
		<div className='play_date_requests'>
			<h2>Play Date Requests here!</h2>
			<ul>
				{reqs.map((rq) => {
					return (
						<li>
							<p>
								<strong>Play Date: </strong> <span>{rq.date}</span>
							</p>
							<p>
								<strong>Request Sender: </strong>
								<span>{rq.sender.email}</span>
							</p>{' '}
							<p className='actions'>
								<button
									className='btn_accept_play_date_req'
									id={rq._id}
									sender={rq.sender.email}
									date={rq.date}
									onClick={acceptRequest}
								>
									Accept
								</button>
							</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default PlayDateRequests;
