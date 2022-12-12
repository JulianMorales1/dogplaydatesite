import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/Signup.css';

const baseURL = process.env.REACT_APP_URL;

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const location = useLocation();
	const navigation = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		fetch(baseURL + '/SignUp', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					navigation('/signin');
				}
			});
	};

	return (
		<div className='signup'>
			{location.pathname === '/' && (
				<form onSubmit={submitHandler}>
					<h3>Sign Up</h3>

					<Link style={{ display: 'block', marginBottom: '15px' }} to='/signin'>
						Existing User?
					</Link>
					<input
						placeholder='Email'
						type='email'
						onChange={(e) => setEmail(e.target.value)}
					></input>
					<input
						placeholder='Password'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
					></input>
					<button type='submit'>Submit</button>
				</form>
			)}
		</div>
	);
};

export default SignUp;
