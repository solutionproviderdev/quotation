import React from 'react';
import { InputNumber } from '../ui/Input';

interface Measurements {
	A: string | null;
	B: string | null;
	C: string | null;
	D: string | null;
}

interface AreaDetailsProps {
	measurements: Measurements;
	onMeasurementsChange: (measurements: Measurements) => void;
}

export const AreaDetails: React.FC<AreaDetailsProps> = ({
	measurements,
	onMeasurementsChange,
}) => {
	const handleChange = (field: keyof Measurements) => (value: string) => {
		const parsedValue = parseFloat(value) || 0;
		onMeasurementsChange({
			...measurements,
			[field]: parsedValue,
		});
	};

	// Convert inches to feet and calculate total area
	const toFeet = (value: string | null) => (parseFloat(value || '0') / 12);	const totalArea =
		((toFeet(measurements.A) + toFeet(measurements.C)) / 2) *
		((toFeet(measurements.B) + toFeet(measurements.D)) / 2);

	return (
		<div className="flex flex-col justify-between space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-800">
					Input Area Details
				</h2>
				<div className="flex items-center px-4 py-2 border rounded-md border-blue-500 bg-blue-50">
					<span className="font-medium text-blue-700">
						Total Area Approx Sqft:
					</span>
					<span className="ml-2 font-bold text-blue-900">
						{totalArea.toFixed(2)}
					</span>
				</div>
			</div>

			{/* Input Fields */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
				<InputNumber
					label="A (in)"
					value={measurements.A !== null ? measurements.A.toString() : ''}
					placeholder="Enter A"
					unit="in"
					onChange={handleChange('A')}
				/>
				<InputNumber
					label="B (in)"
					value={measurements.B !== null ? measurements.B.toString() : ''}
					placeholder="Enter B"
					unit="in"
					onChange={handleChange('B')}
				/>
				<InputNumber
					label="C (in)"
					value={measurements.C !== null ? measurements.C.toString() : ''}
					placeholder="Enter C"
					unit="in"
					onChange={handleChange('C')}
				/>
				<InputNumber
					label="D (in)"
					value={measurements.D !== null ? measurements.D.toString() : ''}
					placeholder="Enter D"
					unit="in"
					onChange={handleChange('D')}
				/>
			</div>
		</div>
	);
};
