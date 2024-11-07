import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../../css/Auth.css';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		Inertia.post('/register', formData, {
			onError: (err) => {
				setErrors(err);
			}
		});
	};

	return (
		<div className="auth-container">
			<div className="auth-box">
				<h1 className="auth-title">Register</h1>
				<form onSubmit={handleSubmit} className="auth-form">
					<div className="form-group">
						<input
							type="text"
							name="name"
							className="form-input"
							placeholder="Name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
						{errors.name && <span className="error-message">{errors.name[0]}</span>}
					</div>

					<div className="form-group">
						<input
							type="email"
							name="email"
							className="form-input"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						{errors.email && <span className="error-message">{errors.email[0]}</span>}
					</div>

					<div className="form-group">
						<input
							type="password"
							name="password"
							className="form-input"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						{errors.password && <span className="error-message">{errors.password[0]}</span>}
					</div>

					<div className="form-group">
						<input
							type="password"
							name="password_confirmation"
							className="form-input"
							placeholder="Confirm Password"
							value={formData.password_confirmation}
							onChange={handleChange}
							required
						/>
						{errors.password_confirmation && <span className="error-message">{errors.password_confirmation[0]}</span>}
					</div>

					<button type="submit" className="submit-button">
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
