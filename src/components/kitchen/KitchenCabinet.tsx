// KitchenCabinet.tsx
import React from 'react';
import CabinetWithShelve from '../2D/Shutters';
import { CabinetWithShelveTypes } from '../2D/Shutters';

interface KitchenCabinetProps {
	upperCabinets: CabinetWithShelveTypes[];
	middleCabinets: CabinetWithShelveTypes[];
	lowerCabinets: CabinetWithShelveTypes[];
	onSelect: (part: 'upper' | 'middle' | 'lower', index: number) => void;
	selectedCabinet: { part: 'upper' | 'middle' | 'lower'; index: number } | null;
}

export default function KitchenCabinet({
	upperCabinets,
	middleCabinets,
	lowerCabinets,
	onSelect,
	selectedCabinet,
}: KitchenCabinetProps) {
	return (
		<div className='flex flex-col items-start gap-0 justify-start'>
			{/* Upper Part */}
			<div className="flex items-end justify-center">
				{upperCabinets.map((cabinet, index) => (
					<div
						key={`upper-${index}`}
						onClick={() => onSelect('upper', index)}
						className="cursor-pointer"
					>
						<CabinetWithShelve
							cabinet={cabinet}
							isSelected={
								selectedCabinet?.part === 'upper' &&
								selectedCabinet.index === index
							}
							setIsSelected={() => onSelect('upper', index)}
						/>
					</div>
				))}
			</div>

			{/* Middle Part */}
			<div className="flex items-start justify-center">
				{middleCabinets.map((cabinet, index) => (
					<div
						key={`middle-${index}`}
						onClick={() => onSelect('middle', index)}
						className="cursor-pointer"
					>
						<CabinetWithShelve
							cabinet={cabinet}
							isSelected={
								selectedCabinet?.part === 'middle' &&
								selectedCabinet.index === index
							}
							setIsSelected={() => onSelect('middle', index)}
						/>
					</div>
				))}
			</div>

			{/* Gap */}
			<div className="h-[120px]"></div>

			{/* Lower Part */}
			<div className="flex items-end justify-center">
				{lowerCabinets.map((cabinet, index) => (
					<div
						key={`lower-${index}`}
						onClick={() => onSelect('lower', index)}
						className="cursor-pointer"
					>
						<CabinetWithShelve
							cabinet={cabinet}
							isSelected={
								selectedCabinet?.part === 'lower' &&
								selectedCabinet.index === index
							}
							setIsSelected={() => onSelect('lower', index)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
