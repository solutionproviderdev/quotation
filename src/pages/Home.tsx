// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import KitchenCabinet from '../components/kitchen/KitchenCabinet';
import { CabinetWithShelveTypes } from '../components/2D/Shutters';
import CabinetForm from '../components/kitchen/CabinetForm';
import GlobalBackgroundSelector from '../components/2D/GlobalBackgroundSelector';
import Sections from '../components/2D/Sections';

// Default cabinet configuration (stored in pixels where needed)
const defaultCabinet: CabinetWithShelveTypes = {
	width: 80,
	height: 160,
	shutterType: 'plain',
	shelve: false,
	hasScating: false,
	backgroundImage: '',
	hasDrawers: false,
	drawersType: 'drawerWithShutter',
	drawerHeight: 30,
};

export default function Home() {
	// Initial counts (you can later add UI to change these counts)
	const [upperCount] = useState(6);
	const [middleCount] = useState(6);
	const [lowerCount] = useState(6);

	// Arrays for each section – each element starts with the default cabinet config.
	const [upperCabinets, setUpperCabinets] = useState<CabinetWithShelveTypes[]>(
		Array(upperCount).fill(defaultCabinet)
	);
	const [middleCabinets, setMiddleCabinets] = useState<
		CabinetWithShelveTypes[]
	>(Array(middleCount).fill(defaultCabinet));
	const [lowerCabinets, setLowerCabinets] = useState<CabinetWithShelveTypes[]>(
		Array(lowerCount).fill(defaultCabinet)
	);

	// Track which cabinet is selected: identified by its section and index.
	const [selectedCabinet, setSelectedCabinet] = useState<{
		part: 'upper' | 'middle' | 'lower';
		index: number;
	} | null>(null);

	// Track the global background image URL.
	const setGlobalbackgroundImage = (imageUrl: string) => {
		// Update each cabinet in all sections to use the new background image.
		setUpperCabinets(prev =>
			prev.map(cabinet => ({ ...cabinet, backgroundImage: imageUrl }))
		);
		setMiddleCabinets(prev =>
			prev.map(cabinet => ({ ...cabinet, backgroundImage: imageUrl }))
		);
		setLowerCabinets(prev =>
			prev.map(cabinet => ({ ...cabinet, backgroundImage: imageUrl }))
		);
	};

	//
	useEffect(() => {}, []);

	// Update the selected cabinet’s properties from the form.
	const handleCabinetPropertyChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		if (!selectedCabinet) return;
		const { name, type, value, checked } = e.target;
		let newValue: string | number | boolean;

		if (type === 'checkbox') {
			newValue = checked;
		} else if (['width', 'height', 'drawerHeight'].includes(name)) {
			// Convert inches (input) to pixels (stored value)
			newValue = (parseFloat(value) || 0) * 5;
		} else if (type === 'number') {
			newValue = parseFloat(value) || 0;
		} else {
			newValue = value;
		}

		// Helper: update the appropriate section’s array.
		const updateCabinets = (
			cabinets: CabinetWithShelveTypes[],
			setCabinets: React.Dispatch<
				React.SetStateAction<CabinetWithShelveTypes[]>
			>
		) => {
			const newCabinets = [...cabinets];
			newCabinets[selectedCabinet.index] = {
				...newCabinets[selectedCabinet.index],
				[name]: newValue,
			};
			setCabinets(newCabinets);
		};

		if (selectedCabinet.part === 'upper') {
			updateCabinets(upperCabinets, setUpperCabinets);
		} else if (selectedCabinet.part === 'middle') {
			updateCabinets(middleCabinets, setMiddleCabinets);
		} else if (selectedCabinet.part === 'lower') {
			updateCabinets(lowerCabinets, setLowerCabinets);
		}
	};

	// Helper to get the configuration of the currently selected cabinet.
	const selectedConfig = selectedCabinet
		? selectedCabinet.part === 'upper'
			? upperCabinets[selectedCabinet.index]
			: selectedCabinet.part === 'middle'
			? middleCabinets[selectedCabinet.index]
			: lowerCabinets[selectedCabinet.index]
		: null;

	console.log(selectedCabinet);

	// Handle deleting a cabinet.
	const handleDelete = () => {
		if (selectedCabinet) {
			if (selectedCabinet.part === 'upper') {
				const updatedUpperCabinets = [...upperCabinets];
				updatedUpperCabinets.splice(selectedCabinet.index, 1);
				setUpperCabinets(updatedUpperCabinets);
			} else if (selectedCabinet.part === 'middle') {
				const updatedMiddleCabinets = [...middleCabinets];
				updatedMiddleCabinets.splice(selectedCabinet.index, 1);
				setMiddleCabinets(updatedMiddleCabinets);
			} else if (selectedCabinet.part === 'lower') {
				const updatedLowerCabinets = [...lowerCabinets];
				updatedLowerCabinets.splice(selectedCabinet.index, 1);
				setLowerCabinets(updatedLowerCabinets);
			}
			setSelectedCabinet(null);
		}
	};

	console.log(upperCabinets);

	return (
		<div className="bg-gray-50 min-h-screen">
			<h1 className="text-2xl font-bold mb-6 text-gray-800">
				Draw Your Cabinets
			</h1>
			<div className="grid grid-cols-2 gap-8">
				{/* Left Side: Global Background Selector + Cabinet Form */}
				<div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start space-y-2">
					<GlobalBackgroundSelector
						onSelect={setGlobalbackgroundImage}
						selectedImage={defaultCabinet.backgroundImage}
						onChange={() => {}}
					/>
					<Sections
						lowerCabinets={lowerCabinets}
						setLowerCabinets={setLowerCabinets}
						upperCabinets={upperCabinets}
						setUpperCabinets={setUpperCabinets}
						middleCabinets={middleCabinets}
						setMiddleCabinets={setMiddleCabinets}
					/>
					{selectedConfig ? (
						<CabinetForm
							config={selectedConfig}
							onChange={handleCabinetPropertyChange}
							onDelete={() => handleDelete()}
						/>
					) : (
						<p className="text-gray-700">Select a cabinet...</p>
					)}
				</div>

				{/* Right Side: Cabinet Preview */}
				<div className="flex items-start justify-center">
					<KitchenCabinet
						upperCabinets={upperCabinets}
						middleCabinets={middleCabinets}
						lowerCabinets={lowerCabinets}
						onSelect={(part, index) => setSelectedCabinet({ part, index })}
						selectedCabinet={selectedCabinet}
					/>
				</div>
			</div>
		</div>
	);
}
