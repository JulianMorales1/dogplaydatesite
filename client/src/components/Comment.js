import React from 'react';

import '../styles/Posts.css';
const Comment = ({ comment }) => {
	return (
		<li className='comment'>
			<p className='comment_body'>
				<span>
					<strong>Text:</strong>{' '}
				</span>{' '}
				<span>{comment.body}</span>
			</p>
			<p className='comment_user'>
				<span>
					<strong>Commented by:</strong>{' '}
				</span>{' '}
				<span>{comment.useremail}</span>
			</p>
			<p className='comment_date'>
				<span>
					<strong>Date:</strong>{' '}
				</span>{' '}
				<span>{comment.createdAt.toString()}</span>
			</p>
		</li>
	);
};

export default Comment;
