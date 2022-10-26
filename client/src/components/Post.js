import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import '../styles/Posts.css';
import loading from '../assets/loading.gif';

import Comment from './Comment';
const Post = ({ dog }) => {
	const user = useSelector((state) => state.user.user);
	const [comment, setComment] = useState('');
	const [openCommentBox, setOpenCommentBox] = useState(false);
	const [submitTxt, setSubmitTxt] = useState('Submit');
	const [submitting, setSubmitting] = useState(false);
	const commmentBoxToggler = (e) => {
		setOpenCommentBox(true);
	};

	const submitComment = async (e) => {
		setSubmitting(true);
		const commentObj = {
			body: comment,
			userid: user._id,
			useremail: user.email,
			dog: dog._id,
		};
		const response = await fetch(
			process.env.REACT_APP_SERVER_URL + '/comments',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(commentObj),
			}
		);

		const json = await response.json();
		if (json.success) {
			setSubmitting(false);
			setOpenCommentBox(false);
		}
	};
	const book = (e) => {};

	return (
		<div className='post'>
			<img src={process.env.REACT_APP_SERVER_URL + dog.photo} alt='dog' />
			<p className='dog_name'>
				<strong>Dog Name: {dog.name}</strong>
			</p>
			<p className='dog_breed'>
				<strong>Dog Breed: {dog.breed}</strong>
			</p>
			<p className='user'>
				<strong>posted by:{dog.user.email} </strong>
			</p>

			<h3>Comments:</h3>
			<ul className='comments'>
				{dog.comments.map((c) => {
					return <Comment comment={c} />;
				})}
			</ul>
			<p className='actions'>
				{openCommentBox && (
					<>
						<input
							className='comment_box'
							type='text'
							onChange={(e) => setComment(e.target.value)}
							placeholder='your comment here'
						/>
						<button
							className='btn_comment_submit'
							id={`submit_` + dog._id}
							onClick={submitComment}
						>
							{submitting ? (
								<img src={loading} style={{ width: '15px', height: '15px' }} />
							) : (
								'Submit'
							)}
						</button>
					</>
				)}
				<button
					className='btn_comment'
					onClick={commmentBoxToggler}
					id={`comment_` + dog._id}
				>
					Comment
				</button>
				{/* <button className='btn_book' onClick={book} id={`book_` + dog._id}>
					Book Appointment
				</button> */}
			</p>
		</div>
	);
};

export default Post;
