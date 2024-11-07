import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/inertia-react';
import ProductModal from '../Components/ProductModal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../css/Dashboard.css';

const Dashboard = () => {
	const { auditLogsUrl } = usePage().props;

	console.log(auditLogsUrl);

	const [products, setProducts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);

	useEffect(() => {
		axios.get('/products')
			.then(response => {
				setProducts(response.data);
			})
			.catch(error => {
				console.error('Error fetching products:', error);
			});
	}, []);

	const handleDelete = (id) => {
		axios.delete(`/products/${id}`)
			.then(() => {
				setProducts(products.filter(product => product.id !== id));
			})
			.catch(error => {
				console.error('Error deleting product:', error);
			});
	};

	const openModal = (product = null) => {
		setIsEditing(!!product);
		setCurrentProduct(product);
		setShowModal(true);
	};

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
		<div className="dashboard">
			<h1>Product Dashboard</h1>

			<div className="page-buttons">
			<Link href={auditLogsUrl} className="btn">
				View Audit Logs
			</Link>

			<button onClick={() => openModal()} className="add-product-btn btn-icon">
					<FaPlus /> <span>Add Product</span>
			</button>
			</div>


			<table className="product-list">
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Description</th>
						<th>Stock Quantity</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<tr key={product.id}>
							<td>{product.name}</td>
							<td>R{product.price}</td>
							<td>{product.description}</td>
							<td>{product.stock_quantity}</td>
							<td>
								<button onClick={() => openModal(product)} className="edit-btn btn-icon">
									<FaEdit /> <span>Edit</span>
								</button>
								<button onClick={() => handleDelete(product.id)} className="delete-btn btn-icon">
									<FaTrash /> <span>Remove</span>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<ProductModal
				showModal={showModal}
				setShowModal={setShowModal}
				isEditing={isEditing}
				currentProduct={currentProduct}
				setProducts={setProducts}
				products={products}
			/>
		</div>
	);
};

export default Dashboard;
