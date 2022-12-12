import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import '../styles/Friends.css';
const Friends = () => {
	const user = useSelector((state) => state.user.user);

	const [publicUsers, setPublicUsers] = useState([]);
	const [friends, setFriends] = useState(user.Friends);
	const [friendRequests, setFriendRequests] = useState(user.FriendRequests);

	const [accepted, setAccepted] = useState(false);
	const [sent, setSent] = useState(false);

	const sendFriendRequest = async (event) => {
		const payload = {
			sender: user.email,
			reciever: event.target.id,
		};

		const response = await fetch(
			process.env.REACT_APP_URL + '/send_friend_request',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(payload),
			}
		);
		const json = await response.json();
	};

	const acceptfRequest = async (event) => {
		const payload = {
			acceptor_email: user.email,
			acceptor_id: user._id,
			sender_email: event.target.id,
		};

		const response = await fetch(
			process.env.REACT_APP_URL + '/accept_friend_request',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(payload),
			}
		);
		const json = await response.json();

		if (json.success) {
			setAccepted(true);
		}
	};
	useEffect(() => {
		(async () => {
			if (user._id !== undefined) {
				console.log(user._id);
				const response = await fetch(
					process.env.REACT_APP_URL + '/users/' + user.email
				);
				const json = await response.json();

				user.sentRequests.forEach((sr) => {
					json.data.map((user) => {
						if (user.email === sr) {
							user['sent'] = true;
						}
					});
				});
				console.log('updated data', json);
				setPublicUsers((prev) => {
					return [...json.data];
				});
			}
		})();
	}, []);
	return (
		<div className='friends'>
			<div className='friend_requests'>
				<h3>Friend Requests</h3>
				<ul className='friend_requests_list'>
					{friendRequests.map((fr) => {
						return (
							<li>
								{fr}{' '}
								<button onClick={acceptfRequest} id={fr}>
									Accept
								</button>
							</li>
						);
					})}
				</ul>
			</div>
			<div className='existing_friends'>
				<h3>Existing Friends</h3>
				<ul className='existing_friends_list'>
					{friends.map((fr) => {
						return <li>{fr}</li>;
					})}
				</ul>
			</div>
			<div className='existing_friends'>
				<h3>Send Friend Request</h3>
				<ul className='public_users_list'>
					{publicUsers.map((user) => {
						return (
							<li>
								{user.email}
								<button
									disabled={user.sent ? true : false}
									id={user.email}
									className={user.sent ? 'sent' : ''}
									onClick={sendFriendRequest}
								>
									{user.sent ? 'Request Sent' : 'Send Friend Request'}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Friends;
