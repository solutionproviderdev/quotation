import React from 'react';
import { Dropdown } from '../ui/Dropdown';

interface ProductSelectorProps {
	selectedProduct: string;
	selectedItemType: string;
	selectedSeries: string;
	onProductChange: (product: string) => void;
	onItemTypeChange: (itemType: string) => void;
	onSeriesChange: (series: string) => void;
}

const products = [
	'Kitchen Cabinets',
	'Full Height Cabinets',
	'Folding Door',
	'Dinner Wagon',
	'Dressing Unit',
	'Dressing Unit With Cabinets',
	'TV Units / Media Units',
	'Floating Cabinets',
	'Upper Storage Cabinets',
	'Modular Storage Cabinets',
	'Floating Self (Horizontal I)',
	'Open Shelves (Box)',
	'False Ceiling',
	'Decorative Wall Panelling',
	'Bedhead Panelling',
	'Mirror Panelling',
	'Wardrobes with Upper Storage (Cabinets)',
	'Walking Closets (Cabinets)',
	'Corner Cabinets',
	'Customize Sofa Sets',
	'Customize Bed',
];

const itemTypes = [
	'Lower Front Shutter (Under Slab)',
	'Middle Front Shutter (Under Slab)',
	'Upper Front Shutter (Under Slab)',
	'Lower Modular Cabinet',
	'Middle Part Cabinet',
	'Upper Part Cabinet',
	'Larder Unit',
];

const seriesOptions = ['Economic Series', 'Premium Series', 'Luxury Series'];

export const ProductSelector: React.FC<ProductSelectorProps> = ({
	selectedProduct,
	selectedItemType,
	selectedSeries,
	onProductChange,
	onItemTypeChange,
	onSeriesChange,
}) => {
	const isKitchenCabinet = selectedProduct === 'Kitchen Cabinets';
	const isProductSelected = selectedProduct !== '';

	return (
		<div className="flex space-x-2">
			{/* Dropdown for Product Selection */}
			<div className="flex-1">
				<Dropdown
					label="Select Product"
					options={products}
					selectedOption={selectedProduct}
					onOptionSelect={product => onProductChange(product)}
				/>
			</div>

			{/* Dropdown for Item Type (only for Kitchen Cabinets) */}
			{isKitchenCabinet && (
				<div className="flex-1">
					<Dropdown
						label="Select Item Type"
						options={itemTypes}
						selectedOption={selectedItemType}
						onOptionSelect={onItemTypeChange}
					/>
				</div>
			)}

			{isProductSelected && (
				<div className="flex-1">
					<Dropdown
						label="Select Series"
						options={seriesOptions}
						selectedOption={selectedSeries}
						onOptionSelect={onSeriesChange}
					/>
				</div>
			)}
		</div>
	);
};
