import React from 'react';
import initialData from '../../data/initialData.json';
import { Dropdown } from '../ui/Dropdown';

interface AreaSelectorProps {
	selectedArea: string;
	selectedLayout: string;
	onAreaChange: (area: string) => void;
	onLayoutChange: (layout: string) => void;
}

export const AreaSelector: React.FC<AreaSelectorProps> = ({
	selectedArea,
	selectedLayout,
	onAreaChange,
	onLayoutChange,
}) => {
	const area = initialData.areas.find(a => a.id === selectedArea);

	const isAreaSelected = !!selectedArea;

	return (
		<div className="flex space-x-2">
			{/* Custom Dropdown for Select Area */}
			<div className="w-1/2">
				<Dropdown
					label="Select Area"
					options={initialData.areas.map(a => a.name)}
					selectedOption={selectedArea ? area?.name || '' : ''}
					onOptionSelect={selectedName => {
						const selected = initialData.areas.find(
							a => a.name === selectedName
						);
						onAreaChange(selected ? selected.id : '');
					}}
				/>
			</div>

			{isAreaSelected && (
				<div className="w-1/2">
					<Dropdown
						label="Select Layout Types"
						options={area ? area.layouts : []}
						selectedOption={selectedLayout}
						onOptionSelect={onLayoutChange}
					/>
				</div>
			)}
		</div>
	);
};
