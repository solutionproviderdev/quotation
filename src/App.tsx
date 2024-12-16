import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout/rootLayout';
import Home from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import Quotations from './pages/Quotations';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="quotations" element={<Quotations />} />
					<Route path="products" element={<ProductPage />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
