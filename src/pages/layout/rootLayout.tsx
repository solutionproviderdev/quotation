import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Layout: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Navigation Bar */}
			<nav
				style={{ backgroundColor: '#046289' }}
				className="shadow-md border-b border-blue-800"
			>
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<div className="text-white font-bold text-2xl tracking-wide">
						<NavLink to="/" end>
							Quotation App
						</NavLink>
					</div>
					<div className="flex space-x-6">
						<NavLink
							to="/"
							end
							className={({ isActive }) =>
								isActive
									? 'text-white font-semibold underline transition duration-300 hover:text-blue-200'
									: 'text-white font-semibold transition duration-300 hover:text-blue-200'
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/quotations"
							className={({ isActive }) =>
								isActive
									? 'text-white font-semibold underline transition duration-300 hover:text-blue-200'
									: 'text-white font-semibold transition duration-300 hover:text-blue-200'
							}
						>
							Quotations
						</NavLink>
						<NavLink
							to="/products"
							className={({ isActive }) =>
								isActive
									? 'text-white font-semibold underline transition duration-300 hover:text-blue-200'
									: 'text-white font-semibold transition duration-300 hover:text-blue-200'
							}
						>
							Products
						</NavLink>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="flex-grow container mx-auto px-2 py-2">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
