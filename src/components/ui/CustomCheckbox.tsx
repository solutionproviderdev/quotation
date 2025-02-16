import React from 'react';

interface CustomCheckboxProps {
	label: string;
	name: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
	label,
	name,
	checked,
	onChange,
}) => {
	return (
		<div className="flex items-center space-x-2">
			<span className="text-[#046289] text-sm font-medium">{label}</span>
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					name={name}
					checked={checked}
					onChange={onChange}
					className="sr-only peer"
				/>
				<div
					className="w-11 h-6 bg-[#cce3ea] rounded-full 
                    peer-focus:ring-2 peer-focus:ring-[#046289]
                    dark:bg-gray-300
                    peer-checked:bg-[#046289] active:bg-[#035470]
                    peer-checked:after:translate-x-full peer-checked:after:border-white
                    after:content-[''] after:absolute after:top-0.5 after:left-0.5
                    after:bg-white after:border-[#cce3ea] after:border after:rounded-full
                    after:h-5 after:w-5 after:transition-all"
				></div>
			</label>
		</div>
	);
};
