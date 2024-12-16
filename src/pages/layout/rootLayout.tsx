import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Navigation Bar */}
			<nav className="bg-blue-600 text-white py-4">
				<div className="container mx-auto px-4 flex justify-between items-center">
					<div className="font-bold text-xl">
						<Link to="/">Quotation App</Link>
					</div>
					<div className="space-x-4">
						<Link to="/" className="hover:underline">
							Home
						</Link>
						<Link to="/quotations" className="hover:underline">
							Quotations
						</Link>
						<Link to="/products" className="hover:underline">
							Products
						</Link>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="flex-grow container mx-auto px-4 py-6">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
