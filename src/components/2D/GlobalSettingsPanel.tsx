// src/components/GlobalSettingsPanel.tsx
import React from 'react';
import GlobalBackgroundSelector from './GlobalBackgroundSelector';
import { InputNumber } from '../ui/Input';

export interface SectionGlobalSettings {
	globalHeight: number; // in inches
	totalWidth: number; // in inches
	backgroundImage: string;
}

interface GlobalSettingsPanelProps {
	settings: { [section: string]: SectionGlobalSettings };
	onChange: (
		section: string,
		field: keyof SectionGlobalSettings,
		value: string
	) => void;
}

export default function GlobalSettingsPanel({
	settings,
	onChange,
}: GlobalSettingsPanelProps) {
	return (
		<div className="p-4 bg-white rounded-lg shadow-md space-y-4">
			{Object.keys(settings).map(section => {
				const config = settings[section];
				return (
					<div key={section} className="border p-2 rounded">
						<h3 className="text-lg font-semibold capitalize">
							{section} Section Global Settings
						</h3>
						<div className="flex items-center space-x-4 mt-2">
							<div className="flex flex-col">
								<label className="text-sm text-gray-700">
									Global Height (in)
								</label>
								<InputNumber
									value={config.globalHeight.toString()}
									onChange={val => onChange(section, 'globalHeight', val)}
									className="w-24"
								/>
							</div>
							<div className="flex flex-col">
								<label className="text-sm text-gray-700">
									Total Width (in)
								</label>
								<InputNumber
									value={config.totalWidth.toString()}
									onChange={val => onChange(section, 'totalWidth', val)}
									className="w-24"
								/>
							</div>
						</div>
						<div className="mt-2">
							<GlobalBackgroundSelector
								selected={config.backgroundImage}
								onSelect={val => onChange(section, 'backgroundImage', val)}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
