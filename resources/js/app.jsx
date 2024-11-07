import { createInertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Import your Navbar component
import '../css/app.css';

// Custom component to handle conditional rendering of Navbar
function AppWithConditionalNavbar({ App, props }) {
	const location = useLocation();

	// Hide Navbar on login and register pages
	const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

	return (
		<>
			{!hideNavbar && <Navbar />}
			<App {...props} />
		</>
	);
}

createInertiaApp({
	resolve: name => {
		console.log(`Resolving page: ${name}`);
		return import(`./Pages/${name}`).then(module => module.default);
	},
	setup({ el, App, props }) {
		render(
			<BrowserRouter>
				<AppWithConditionalNavbar App={App} props={props} />
			</BrowserRouter>,
			el
		);
	},
});
