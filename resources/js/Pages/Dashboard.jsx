import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/inertia-react';
import ProductModal from '../Components/ProductModal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../css/Dashboard.css';

const Dashboard = () => {
	const { auditLogsUrl } = usePage().props;

	const [products, setProducts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);
	const [successMessage, setSuccessMessage] = useState(''); // State for success message
	const [currentPage, setCurrentPage] = useState(1); // Current page number
	const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering

	// Number of products per page
	const productsPerPage = 5;

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
		const confirmDelete = window.confirm('Are you sure you want to delete this product?');
		if (confirmDelete) {
			axios.delete(`/products/${id}`)
				.then(() => {
					setProducts(products.filter(product => product.id !== id));
					setSuccessMessage('Product deleted successfully!');
					setTimeout(() => {
						setSuccessMessage('');
					}, 3000);
				})
				.catch(error => {
					console.error('Error deleting product:', error);
				});
		}
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

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Paginate the filtered products
	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * productsPerPage,
		currentPage * productsPerPage
	);

	// Calculate total pages
	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	return (
		<div className="dashboard">
			<h1>Product Dashboard</h1>

			{successMessage && <div className="success-message">{successMessage}</div>}

			<div className="page-buttons">
				<Link href={auditLogsUrl} className="btn">
					View Audit Logs
				</Link>

				<button onClick={() => openModal()} className="add-product-btn btn-icon">
					<FaPlus /> <span>Add Product</span>
				</button>
			</div>

			{/* Search Filter */}
			<input
				type="text"
				placeholder="Search products by name"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="search-input"
			/>

			{/* Product Table */}
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
					{paginatedProducts.map(product => (
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

			{/* Pagination Controls */}
			<div className="pagination">
				<button
					onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}>
					Previous
				</button>
				<span>Page {currentPage} of {totalPages}</span>
				<button
					onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
					disabled={currentPage === totalPages}>
					Next
				</button>
			</div>

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
