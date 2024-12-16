import React, { useState } from 'react';
import { InputNumber } from '../ui/Input';

interface ProductMeasurementProps {
	measurements: {
		length: number;
		height: number;
		depth: number;
	};
	onMeasurementsChange: (measurements: {
		length: string;
		height: string;
		depth: string;
	}) => void;
}

export const ProductMeasurement: React.FC<ProductMeasurementProps> = ({
	measurements,
	onMeasurementsChange,
}) => {
	const [totalSqft, setTotalSqft] = useState(0);

	const handleChange =
		(field: keyof typeof measurements) => (value: string) => {
			const numericValue = parseFloat(value) || 0;
			const updatedMeasurements = { ...measurements, [field]: numericValue };
			onMeasurementsChange(updatedMeasurements);
			calculateTotalSqft(updatedMeasurements);
		};

	const calculateTotalSqft = ({
		length,
		height,
	}: {
		length: number;
		height: number;
	}) => {
		const sqft = Math.ceil((length * height) / 144); // Round up the value
		setTotalSqft(sqft);
	};


	return (
		<div className="space-y-2">
			<h3 className="text-lg font-semibold text-gray-800">
				Product Measurements
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<InputNumber
					label="Length (in)"
					value={measurements.length.toString()}
					placeholder="Enter length"
					unit="in"
					onChange={handleChange('length')}
				/>
				<InputNumber
					label="Height (in)"
					value={measurements.height.toString()}
					placeholder="Enter height"
					unit="in"
					onChange={handleChange('height')}
				/>
				<InputNumber
					label="Depth (in)"
					value={measurements.depth.toString()}
					placeholder="Enter depth"
					unit="in"
					onChange={handleChange('depth')}
				/>
				<InputNumber
					label="Total Sqft"
					value={totalSqft.toFixed(2)}
					unit="sqft"
					onChange={() => {}}
				/>
			</div>
		</div>
	);
};
