import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
	label: string;
	options: string[];
	selectedOption: string;
	onOptionSelect: (option: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
	label,
	options,
	selectedOption,
	onOptionSelect,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<label className="text-sm font-medium">{label}</label>
			<button
				onClick={() => setIsOpen(prev => !prev)}
				className="flex items-center justify-between border rounded px-2 py-1 w-40 text-sm"
			>
				{selectedOption || 'Select'}
				{isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
			</button>

			{isOpen && (
				<ul className="absolute mt-1 bg-white border rounded shadow max-h-40 w-40 overflow-auto text-sm z-50">
					{options.map(option => (
						<li
							key={option}
							onClick={() => {
								onOptionSelect(option);
								setIsOpen(false);
							}}
							className={`cursor-pointer px-2 py-1 hover:bg-gray-100 ${
								option === selectedOption ? 'bg-blue-500 text-white' : ''
							}`}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
