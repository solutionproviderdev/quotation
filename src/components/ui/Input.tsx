import React from 'react';

interface InputProps {
	label?: string;
	value: string;
	placeholder?: string;
	unit?: string;
	onChange: (value: string) => void;
}

export const InputNumber: React.FC<InputProps> = ({
	label,
	value,
	placeholder = '',
	unit = '',
	onChange,
}) => {
	return (
		<div className="relative w-40">
			<label className="text-sm font-medium mb-1 block">{label}</label>
			<div className="flex items-center">
				<input
					type="number"
					value={value}
					placeholder={placeholder}
					onChange={e => onChange(e.target.value)}
					className="px-2 py-1 border rounded-sm text-sm w-full outline-none focus:ring-blue-500 focus:border-blue-500"
					style={{
						appearance: 'textfield',
						MozAppearance: 'textfield',
						WebkitAppearance: 'none',
					}}
				/>
				{unit && (
					<span className="ml-2 text-sm px-1 text-gray-600">{unit}</span>
				)}
			</div>
		</div>
	);
};
