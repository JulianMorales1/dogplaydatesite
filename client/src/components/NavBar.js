import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import dogHouseIcon from '../assets/dog-house.png';
import calandarIcon from '../assets/calendar.png';
const NavBar = () => {
	return (
		<div className='nav_bar'>
			<div>
				<Link to='/'>
					<img className='icon home' src={dogHouseIcon} />
				</Link>
			</div>
			<ul className='navigation'>
				<li>
					<Link to='/play_date_requests'>Play Date Requests</Link>
				</li>
				<li>
					<Link to='/friends'>Friends</Link>
				</li>
				<li>
					<Link to='/posts'>Posts</Link>
				</li>
				<li>
					<Link to='/profile'>Profile</Link>
				</li>

				<li>
					<Link to='/calendar'>
						<img className='icon' src={calandarIcon} />
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
