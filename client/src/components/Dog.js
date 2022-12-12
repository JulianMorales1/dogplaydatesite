import React from 'react';

import '../styles/Dog.css';
const Dog = ({ dog, onDelete, onEdit, onView }) => {
	return (
		<li className='dog'>
			<img
				src={
					process.env.REACT_APP_URL +
					'/uploads/photo_' +
					dog._id +
					dog.ext
				}
				style={{
					width: '150px',
					height: '150px',
					borderRadius: '50%',
					display: 'block',
				}}
				alt='dog photo'
			/>
			<div className='row'>
				<strong>Name</strong>: <h4>{dog.name}</h4>
			</div>
			<div className='row'>
				<strong>Breed: </strong> <p>{dog.breed}</p>
			</div>
			<div className='row'>
				<strong>Birth</strong>
				<p>{dog.dateOfBirth}</p>
			</div>

			<div className='actions'>
				<button className='btn btn_delete' onClick={(e) => onDelete(dog._id)}>
					Delete
				</button>
				{/* <button className='btn btn_view' onClick={(e)=>onView(dog._id)}>View Dog</button> */}
				<button className='btn btn_edit' onClick={(e) => onEdit(dog._id)}>
					Edit
				</button>
			</div>
		</li>
	);
};

export default Dog;
