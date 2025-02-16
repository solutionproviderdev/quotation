import React from 'react';

interface CustomNumberInputProps {
	label: string;
	name: string;
	value: number | string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
}

export const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
	label,
	name,
	value,
	onChange,
	placeholder = '',
	className = '',
}) => {
	return (
		<div className="flex flex-col">
			<label className="text-[#046289] text-sm font-medium mb-1">{label}</label>
			<input
				type="number"
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`px-3 py-2 border border-[#cce3ea] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#046289] transition duration-150 ease-in-out bg-white ${className}`}
			/>
		</div>
	);
};
