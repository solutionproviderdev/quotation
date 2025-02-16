// src/components/kitchen/CabinetForm.tsx
import React, { useEffect, useRef } from 'react';
import { CabinetWithShelveTypes } from '../2D/Shutters';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { CustomSelect } from '../ui/CustomSelect';
import { CustomNumberInput } from '../ui/CustomNumberInput';

interface Option {
	value: string;
	label: string;
}

interface CabinetFormProps {
	config: CabinetWithShelveTypes;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	onDelete?: () => void;
}

export default function CabinetForm({
	config,
	onChange,
	onDelete,
}: CabinetFormProps) {
	// Use a ref to track which field was toggled last.
	const lastToggledRef = useRef<string>('');

	// Wrap the parent's onChange to capture toggle changes.
	const handleLocalChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		if (e.target.name === 'shelve' || e.target.name === 'hasDrawers') {
			lastToggledRef.current = e.target.name;
		}
		onChange(e);
	};

	// Enforce mutual exclusivity:
	// If both shelve and drawers become true, disable the one that was not toggled last.
	useEffect(() => {
		if (config.shelve && config.hasDrawers) {
			if (lastToggledRef.current === 'hasDrawers') {
				// User toggled drawers last, so disable shelve.
				const fakeEvent = {
					target: {
						name: 'shelve',
						type: 'checkbox',
						checked: false,
						value: 'false',
					},
				} as React.ChangeEvent<HTMLInputElement>;
				onChange(fakeEvent);
			} else if (lastToggledRef.current === 'shelve') {
				// User toggled shelve last, so disable drawers.
				const fakeEvent = {
					target: {
						name: 'hasDrawers',
						type: 'checkbox',
						checked: false,
						value: 'false',
					},
				} as React.ChangeEvent<HTMLInputElement>;
				onChange(fakeEvent);
			}
		}
	}, [config.shelve, config.hasDrawers, onChange]);

	// Define options for the select fields.
	const shutterOptions: Option[] = [
		{ label: 'Plain', value: 'plain' },
		{ label: 'With Glass', value: 'withGlass' },
		{ label: 'Open', value: 'open' },
		{ label: 'Kitchen Hood', value: 'kitchenHood' },
		{ label: 'Gap', value: 'gap' },
	];

	const drawersOptions: Option[] = [
		{ label: 'Drawer with Shutter', value: 'drawerWithShutter' },
		{ label: 'Waste System', value: 'wasteSystem' },
		{ label: 'Multi Drawer', value: 'threeDrawer' },
		{ label: 'Bottle Rack', value: 'bottleRack' },
	];

	return (
		<div className="py-2 space-y-2">
			<CustomNumberInput
				label="Width (inches)"
				name="width"
				value={config.width / 5}
				onChange={handleLocalChange}
			/>

			<CustomNumberInput
				label="Height (inches)"
				name="height"
				value={config.height / 5}
				onChange={handleLocalChange}
			/>

			<CustomSelect
				label="Shutter Type"
				name="shutterType"
				value={config.shutterType}
				onChange={handleLocalChange}
				options={shutterOptions}
			/>

			<div>
				<span className="text-gray-700 font-medium">Options</span>
				<div className="flex flex-wrap gap-4 mt-2">
					<CustomCheckbox
						label="Scating"
						name="hasScating"
						checked={config.hasScating}
						onChange={handleLocalChange}
					/>
					<CustomCheckbox
						label="Shelve"
						name="shelve"
						checked={config.shelve}
						onChange={handleLocalChange}
					/>
					<CustomCheckbox
						label="Drawers"
						name="hasDrawers"
						checked={config.hasDrawers}
						onChange={handleLocalChange}
					/>
				</div>
			</div>

			{config.hasDrawers && (
				<>
					<CustomSelect
						label="Drawers Type"
						name="drawersType"
						value={config.drawersType}
						onChange={handleLocalChange}
						options={drawersOptions}
					/>
					{config.drawersType === 'drawerWithShutter' && (
						<CustomNumberInput
							label="Drawer Height (inches)"
							name="drawerHeight"
							value={config.drawerHeight / 5}
							onChange={handleLocalChange}
						/>
					)}
				</>
			)}

			{/* Delete Button */}
			{onDelete && (
				<div className="pt-4">
					<button
						onClick={onDelete}
						className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition duration-150 ease-in-out"
					>
						Delete Cabinet
					</button>
				</div>
			)}
		</div>
	);
}
