import React from 'react';
import initialData from '../../data/initialData.json';
import { Dropdown } from '../ui/Dropdown';

interface ProjectTypeSelectorProps {
	selectedType: string;
	selectedSubcategory: string;
	onTypeChange: (type: string) => void;
	onSubcategoryChange: (subcategory: string) => void;
}

export const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({
	selectedType,
	selectedSubcategory,
	onTypeChange,
	onSubcategoryChange,
}) => {
	const projectType = initialData.projectTypes.find(
		type => type.id === selectedType
	);

	const isCatagorySelected = !!selectedType;

	return (
		<div className="flex space-x-2">
			{/* Custom Dropdown for Project Type */}
			<div className="w-1/2">
				<Dropdown
					label="Project Type"
					options={initialData.projectTypes.map(type => type.name)}
					selectedOption={selectedType ? projectType?.name || '' : ''}
					onOptionSelect={selectedName => {
						const selected = initialData.projectTypes.find(
							type => type.name === selectedName
						);
						onTypeChange(selected ? selected.id : '');
					}}
				/>
			</div>

			{isCatagorySelected && (
				<div className="w-1/2">
					<Dropdown
						label="Subcategory"
						options={projectType ? projectType.subcategories : []}
						selectedOption={selectedSubcategory}
						onOptionSelect={onSubcategoryChange}
					/>
				</div>
			)}
		</div>
	);
};
