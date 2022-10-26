import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Post from '../components/Post';
const Posts = () => {
	const user = useSelector((state) => state.user.user);
	const [posts, setPosts] = useState([]);
	const [playDate, setPlayDate] = useState(null);
	const [sending, setSending] = useState(false);

	const sendPlayDateRequest = async (e) => {
		if (playDate === null) {
			return;
		}
		setSending(true);

		const reqObj = {
			date: playDate,
			sender: user._id,
			recievers: [...user.Friends],
		};
		const response = await fetch(
			process.env.REACT_APP_SERVER_URL + '/play_date_request',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(reqObj),
			}
		);
		const json = await response.json();
		if (json.success) {
			setSending(false);
		}
	};

	useEffect(() => {
		(async () => {
			const response = await fetch(
				process.env.REACT_APP_SERVER_URL + '/all_posts/' + user.email
			);
			const json = await response.json();

			setPosts((prev) => {
				return [...json.data];
			});
		})();
	}, []);

	return (
		<div>
			<div className='user_section'>
				<p>
					<strong>Current User: </strong>
					{user.email}
				</p>
				<p>
					<label htmlFor='play_date'>Select Play Date</label>
					<input type='date' onChange={(e) => setPlayDate(e.target.value)} />
					<button className='btn_play_date' onClick={sendPlayDateRequest}>
						{sending ? 'sending....' : 'Send Play Date Request'}
					</button>
				</p>
			</div>
			<h3>Posts by your friends</h3>

			<div className='posts_content'>
				{posts.map((p) => {
					return <Post dog={p} />;
				})}
			</div>
		</div>
	);
};

export default Posts;
