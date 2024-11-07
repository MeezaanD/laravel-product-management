import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Product.css';

const ProductModal = ({ showModal, setShowModal, isEditing, currentProduct, setProducts, products }) => {
	const [productData, setProductData] = useState({
		name: '',
		price: '',
		description: '',
		stock_quantity: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState(''); 

	// Reset the form when the modal is closed or opened in "Add" mode
	useEffect(() => {
		if (showModal) {
			if (isEditing && currentProduct) {
				setProductData({
					name: currentProduct.name,
					price: currentProduct.price,
					description: currentProduct.description,
					stock_quantity: currentProduct.stock_quantity,
				});
			} else {
				setProductData({
					name: '',
					price: '',
					description: '',
					stock_quantity: '',
				});
			}
		}
	}, [showModal, isEditing, currentProduct]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrorMessage('');
		setSuccessMessage(''); // Reset success message before trying a new action

		// Validation: Check if fields are filled
		if (!productData.name || !productData.price || !productData.stock_quantity) {
			setErrorMessage('All fields are required');
			return;
		}

		if (isEditing) {
			// Update product
			axios.put(`/products/${currentProduct.id}`, productData)
				.then(response => {
					setProducts(products.map(product =>
						product.id === currentProduct.id ? response.data : product
					));
					setShowModal(false);
					setSuccessMessage('Product updated successfully!');
					setTimeout(() => {
						setSuccessMessage('');
					}, 3000);
				})
				.catch(error => {
					console.error('Error updating product:', error);
					setErrorMessage('Error updating product');
				});
		} else {
			// Create new product
			axios.post('/products', productData)
				.then(response => {
					setProducts([...products, response.data]);
					setShowModal(false);
					setSuccessMessage('Product created successfully!'); // Show success message

					// Clear success message after 3 seconds
					setTimeout(() => {
						setSuccessMessage('');
					}, 3000);
				})
				.catch(error => {
					console.error('Error creating product:', error);
					setErrorMessage('Error creating product');
				});
		}
	};


	return (
		showModal && (
			<div className="modal">
				<div className="modal-content">
					<h2>{isEditing ? 'Edit Product' : 'Create Product'}</h2>
					{errorMessage && <p className="error-message">{errorMessage}</p>}
					{successMessage && <p className="success-message">{successMessage}</p>}
					<form onSubmit={handleSubmit}>
						<div>
							<label>Name</label>
							<input
								type="text"
								name="name"
								value={productData.name}
								onChange={(e) => setProductData({ ...productData, name: e.target.value })}
							/>
						</div>
						<div>
							<label>Price</label>
							<input
								type="number"
								name="price"
								value={productData.price}
								onChange={(e) => setProductData({ ...productData, price: e.target.value })}
							/>
						</div>
						<div>
							<label>Description</label>
							<textarea
								name="description"
								value={productData.description}
								onChange={(e) => setProductData({ ...productData, description: e.target.value })}
							/>
						</div>
						<div>
							<label>Stock Quantity</label>
							<input
								type="number"
								name="stock_quantity"
								value={productData.stock_quantity}
								onChange={(e) => setProductData({ ...productData, stock_quantity: e.target.value })}
							/>
						</div>
						<div>
							<button type="submit">{isEditing ? 'Update Product' : 'Create Product'}</button>
							<button type="button" onClick={() => setShowModal(false)}>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default ProductModal;
