import React from 'react';

export interface Option {
	value: string;
	label: string;
}

interface CustomSelectProps {
	label: string;
	name: string;
	value: string;
	options: Option[];
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
	label,
	name,
	value,
	options,
	onChange,
	className = '',
}) => {
	return (
		<div className="flex flex-col">
			<label className="text-[#046289] text-sm font-medium mb-1">{label}</label>
			<select
				name={name}
				value={value}
				onChange={onChange}
				className={`px-3 py-2 border border-[#cce3ea] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#046289] transition duration-150 ease-in-out bg-white ${className}`}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
