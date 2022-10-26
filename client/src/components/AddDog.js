import React, { useState } from 'react';

import '../styles/Dogs.css';
const AddDog = ({ onNewDog }) => {
	const [name, setName] = useState('');
	const [breed, setBreed] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [picture, setPicture] = useState(null);

	const fileChangeHandler = (e) => {
		setPicture(e.target.files[0]);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		onNewDog({
			name,
			breed,
			dateOfBirth,
			picture,
		});
	};
	return (
		<form className='add_dog' onSubmit={submitHandler}>
			<h3 className='form_heading'>Add New Dog</h3>

			<div className='row spb'>
				<p>Dog Picture</p>
				<input
					type='file'
					onChange={fileChangeHandler}
					className='dogFileCreate'
				/>
			</div>
			<div className='row spb'>
				<p>Dog Name</p>
				<input type='text' onChange={(e) => setName(e.target.value)} />
			</div>
			<div className='row spb'>
				<p>Dog Breed</p>
				<input type='text' onChange={(e) => setBreed(e.target.value)} />
			</div>
			<div className='row spb'>
				<p>Dog Date of Birth</p>
				<input type='date' onChange={(e) => setDateOfBirth(e.target.value)} />
			</div>

			<div>
				<button type='submit' className='btn_submit'>
					Submit
				</button>
			</div>
		</form>
	);
};

export default AddDog;
