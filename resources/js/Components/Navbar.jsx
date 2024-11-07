import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

const Navbar = () => {
	const handleLogout = () => {
		axios.post('/logout')
			.then(() => {
				window.location.href = '/login';
			})
			.catch(error => {
				console.error('Error logging out:', error);
			});
	};

	return (
		<nav className="navbar">
			<div className="container mx-auto">
				<div className="flex">
					<Link to="/dashboard" className="text-lg">Dashboard</Link>
				</div>

				<div>
					<button
						onClick={handleLogout}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
