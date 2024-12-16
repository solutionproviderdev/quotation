import React, { useEffect, useState } from 'react';
import { ProductCollection } from '../types/model';
import { getAllProducts } from '../lib/db';

export const ProductPage: React.FC = () => {
	const [products, setProducts] = useState<ProductCollection[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [filterSeries, setFilterSeries] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: '',
		description: '',
		category: '',
		type: '',
		series: [
			{ name: 'Premium', price: 0 },
			{ name: 'Standard', price: 0 },
			{ name: 'Economy', price: 0 },
		],
	});

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const productData = await getAllProducts(); // Fetch all products from DB
				setProducts(productData);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// Filter products based on search query and series filter
	const filteredProducts = products.filter(product => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesSeries = filterSeries
			? product.series.some(series => series.name === filterSeries)
			: true;
		return matchesSearch && matchesSeries;
	});

	const handleAddProduct = () => {
		setProducts([...products, { ...newProduct, id: `${Date.now()}` }]);
		setNewProduct({
			name: '',
			description: '',
			category: '',
			type: '',
			series: [
				{ name: 'Premium', price: 0 },
				{ name: 'Standard', price: 0 },
				{ name: 'Economy', price: 0 },
			],
		});
		setIsModalOpen(false);
	};

	if (loading) {
		return <div className="text-center py-4">Loading products...</div>;
	}

	if (products.length === 0) {
		return <div className="text-center py-4">No products available.</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold mb-4">Product List</h1>

			{/* Search and Filter */}
			<div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
				<input
					type="text"
					placeholder="Search products..."
					className="border rounded px-4 py-2 w-full sm:w-1/2"
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				<select
					className="border rounded px-4 py-2 w-full sm:w-1/4"
					value={filterSeries}
					onChange={e => setFilterSeries(e.target.value)}
				>
					<option value="">All Series</option>
					<option value="Economic">Economic</option>
					<option value="Premium">Premium</option>
					<option value="Standard">Standard</option>
				</select>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
					onClick={() => setIsModalOpen(true)}
				>
					Add New Product
				</button>
			</div>

			{/* Product Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredProducts.map(product => (
					<div
						key={product.id}
						className="border rounded-md shadow-sm p-4 hover:shadow-md"
					>
						<h2 className="text-lg font-bold mb-2">{product.name}</h2>
						<p className="text-gray-600 mb-4">{product.description}</p>
						<h3 className="font-semibold mb-2">Series:</h3>
						<ul className="list-disc list-inside space-y-1">
							{product.series.map(series => (
								<li key={series.name}>
									<strong>{series.name}:</strong> ${series.price}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Add Product Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded shadow-md w-1/2">
						<h2 className="text-xl font-bold mb-4">Add New Product</h2>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Product Name"
								className="border rounded px-4 py-2 w-full"
								value={newProduct.name}
								onChange={e =>
									setNewProduct({ ...newProduct, name: e.target.value })
								}
							/>
							<input
								type="text"
								placeholder="Product Description"
								className="border rounded px-4 py-2 w-full"
								value={newProduct.description}
								onChange={e =>
									setNewProduct({ ...newProduct, description: e.target.value })
								}
							/>
							<div>
								<h3 className="font-semibold mb-2">Series:</h3>
								{newProduct.series.map((series, index) => (
									<div key={series.name} className="mb-2">
										<label className="block text-sm font-medium mb-1">
											{series.name} Price
										</label>
										<input
											type="number"
											className="border rounded px-4 py-2 w-full"
											value={series.price}
											onChange={e => {
												const updatedSeries = [...newProduct.series];
												updatedSeries[index].price = +e.target.value;
												setNewProduct({ ...newProduct, series: updatedSeries });
											}}
										/>
									</div>
								))}
							</div>
						</div>
						<div className="flex justify-end space-x-2 mt-4">
							<button
								className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
								onClick={() => setIsModalOpen(false)}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
								onClick={handleAddProduct}
							>
								Add Product
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
