import React, { useEffect, useState } from 'react';
import Dog from './Dog.js';
import { useSelector } from 'react-redux';

import '../styles/Dogs.css';
import AddDog from './AddDog.js';
const Dogs = () => {
	const user = useSelector((state) => {
		return state.user.user;
	});
	const [dogs, setDogs] = useState([]);
	const [newDogOpen, setNewDogOpen] = useState(false);

	const newDogHandler = async (newDog) => {
		let formData = new FormData();

		// formData.append('file', newDog.picture);
		console.log(formData);

		for (const key in newDog) {
			console.log(`${key}:${newDog[key]}`);
			formData.append(key, newDog[key]);
		}

		formData.append('file', document.querySelector('.dogFileCreate').files[0]);
		const response = await fetch('http://localhost:5000/dogs/' + user._id, {
			method: 'POST',
			body: formData,
		});
		const result = await response.json();

		if (result.success) {
			fetch(`http://localhost:5000/dogs/${user._id}`)
				.then((response) => response.json())
				.then((result) => {
					if (result.success) {
						setDogs((prev) => {
							return [...result.data];
						});
					} else {
						console.log('error connecting to backend!');
					}
				});
		} else {
			alert('error');
		}
	};

	const dogDeleteHandler = async (id) => {
		const response = await fetch('http://localhost:5000/dogs/' + id, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();

		if (result.success) {
			fetch(`http://localhost:5000/dogs/${user._id}`)
				.then((response) => response.json())
				.then((result) => {
					if (result.success) {
						setDogs((prev) => {
							return [...result.data];
						});
					} else {
						console.log('error connecting to backend!');
					}
				});
		} else {
			alert('error');
		}
	};

	useEffect(() => {
		fetch(`http://localhost:5000/dogs/${user._id}`)
			.then((response) => response.json())
			.then((result) => {
				if (result.success) {
					const serverDogs = result.data;
					console.log(serverDogs);
					setDogs((prev) => {
						return [...serverDogs];
					});
				} else {
					console.log('error connecting to backend!');
				}
			});
	}, []);

	return (
		<>
			{dogs.length === 0 ? (
				<p>No Dogs</p>
			) : (
				<ul className='dogs'>
					{dogs.map((dog) => {
						return <Dog dog={dog} onDelete={dogDeleteHandler} />;
					})}
				</ul>
			)}

			<button onClick={(e) => setNewDogOpen(true)}>Add New Dog</button>

			{newDogOpen && <AddDog onNewDog={newDogHandler} />}
		</>
	);
};

export default Dogs;
