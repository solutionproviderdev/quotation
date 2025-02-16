import bg1 from '../../assets/boards/board1.webp';
import bg2 from '../../assets/boards/board2.webp';
import bg3 from '../../assets/boards/board3.webp';
import bg4 from '../../assets/boards/board4.webp';
import bg5 from '../../assets/boards/board5.webp';
import bg6 from '../../assets/boards/board6.webp';
import bg7 from '../../assets/boards/board7.webp';
import bg8 from '../../assets/boards/board8.webp';
import bg9 from '../../assets/boards/board9.webp';
import bg10 from '../../assets/boards/board10.webp';
import { useState } from 'react';

const backgroundOptions = [
	{ label: 'None', value: '' },
	{ label: 'Background 1', value: bg1 },
	{ label: 'Background 2', value: bg2 },
	{ label: 'Background 3', value: bg3 },
	{ label: 'Background 4', value: bg4 },
	{ label: 'Background 5', value: bg5 },
	{ label: 'Background 6', value: bg6 },
	{ label: 'Background 7', value: bg7 },
	{ label: 'Background 8', value: bg8 },
	{ label: 'Background 9', value: bg9 },
	{ label: 'Background 10', value: bg10 },
];

interface GlobalBackgroundSelectorProps {
	onSelect: (imageUrl: string) => void;
	selectedImage: string | undefined;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function GlobalBackgroundSelector({
	onSelect,
	selectedImage,
	onChange,
}: GlobalBackgroundSelectorProps) {
	const [selected, setSelected] = useState('');

	const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedBackground = e.target.value;
		onChange(e);
		setSelected(selectedBackground);
		onSelect(selectedBackground);
	};

	return (
		<div>
			{/* Label using brand color */}
			<div className="text-[#046289] text-sm font-medium mb-1">
				Global Background
			</div>
			<div className="flex items-center gap-2 flex-wrap w-full">
				{backgroundOptions.map(opt => (
					<div
						key={opt.value}
						className={`relative w-16 h-16 border cursor-pointer transition 
                            hover:border-[#046289] ${
															selected === opt.value
																? 'border-2 border-[#046289]'
																: 'border-[#cce3ea]'
														}`}
						onClick={() =>
							handleBackgroundChange({
								target: { value: opt.value },
							} as React.ChangeEvent<HTMLSelectElement>)
						}
					>
						{opt.value ? (
							<img
								src={opt.value}
								alt={opt.label}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="flex items-center justify-center w-full h-full text-xs text-gray-500">
								None
							</div>
						)}
						{selectedImage === opt.value && (
							<div className="absolute inset-0 border-2 border-[#046289] pointer-events-none"></div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
