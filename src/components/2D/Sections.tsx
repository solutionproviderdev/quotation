import React, { useState } from 'react';
import { CabinetWithShelveTypes } from './Shutters';
import { CustomNumberInput } from '../ui/CustomNumberInput';

interface SectionsProps {
	upperCabinets: CabinetWithShelveTypes[];
	middleCabinets: CabinetWithShelveTypes[];
	lowerCabinets: CabinetWithShelveTypes[];
	setUpperCabinets: React.Dispatch<
		React.SetStateAction<CabinetWithShelveTypes[]>
	>;
	setMiddleCabinets: React.Dispatch<
		React.SetStateAction<CabinetWithShelveTypes[]>
	>;
	setLowerCabinets: React.Dispatch<
		React.SetStateAction<CabinetWithShelveTypes[]>
	>;
}

export default function Sections({
	upperCabinets,
	setUpperCabinets,
	middleCabinets,
	setMiddleCabinets,
	lowerCabinets,
	setLowerCabinets,
}: SectionsProps) {
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	return (
		<div className="">
			{/* Upper Part */}
			<h1>Upper Part</h1>
			<div className="flex justify-center gap-4">
				<CustomNumberInput
					label="Width (inches)"
					name="width"
					value={width / 5}
					onChange={e => {
						setWidth(Number(e.target.value) * 5);
					}}
				/>
				<CustomNumberInput
					label="height (inches)"
					name="height"
					value={height / 5}
					onChange={e => {
						setHeight(Number(e.target.value) * 5);
					}}
				/>
			</div>
		</div>
	);
}
