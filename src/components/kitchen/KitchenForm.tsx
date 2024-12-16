import { useEffect, useState } from 'react';
import { Dropdown } from '../ui/Dropdown';
import { Plus, Trash, Edit2, Check } from 'lucide-react';
import { InputNumber } from '../ui/Input';

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

interface Item {
	type: 'shutter' | 'kitchenHood' | 'glass' | 'blank' | 'gap';
	height?: number; // in inches
	width?: number; // in inches
}

interface SectionData {
	centralHeight: number;
	totalWidth: number;
	items: Item[];
}

interface SectionsState {
	[sectionName: string]: SectionData;
}

export interface TransformedItem {
	type: string;
	height?: number;
	width?: number;
	backgroundImage?: string;
	[key: string]: string | number | undefined;
}

export interface TransformedSection {
	name: string;
	items: TransformedItem[];
	width: number;
	align: string;
	count?: number;
	height?: number;
	isGap?: boolean;
}

interface KitchenFormProps {
	updateSections: (transformedSections: TransformedSection[]) => void;
}

export default function KitchenForm({ updateSections }: KitchenFormProps) {
	const [sections, setSections] = useState<SectionsState>({
		upper: {
			centralHeight: 30,
			totalWidth: 75,
			items: [
				{ type: 'shutter', height: 30, width: 16 },
				{ type: 'shutter', height: 30, width: 16 },
				{ type: 'shutter', height: 30, width: 16 },
				{ type: 'shutter', height: 30, width: 16 },
				{ type: 'shutter', height: 20, width: 11 },
			],
		},
		middle: {
			centralHeight: 24,
			totalWidth: 75,
			items: [
				{ type: 'glass', width: 16, height: 24 },
				{ type: 'kitchenHood', height: 24, width: 32 },
				{ type: 'glass', height: 24, width: 16 },
				{ type: 'glass', height: 24, width: 11 },
			],
		},
		lower: {
			centralHeight: 32,
			totalWidth: 75,
			items: [
				{ type: 'shutter', height: 32, width: 16 },
				{ type: 'shutter', height: 24, width: 16 },
				{ type: 'shutter', height: 24, width: 16 },
				{ type: 'shutter', height: 32, width: 16 },
				{ type: 'shutter', height: 32, width: 11 },
			],
		},
	});

	const [visibleFields, setVisibleFields] = useState<{
		[key: string]: boolean;
	}>({});

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

	const [selectedBackground, setSelectedBackground] = useState<string>('');

	const itemTypes: Item['type'][] = [
		'shutter',
		'kitchenHood',
		'glass',
		'blank',
		'gap',
	];

	const toggleFieldVisibility = (
		section: string,
		index: number,
		field: string
	) => {
		const key = `${section}-${index}-${field}`;
		setVisibleFields(prev => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const recalculateWidths = (
		sectionName: string,
		updatedSections: SectionsState
	) => {
		const section = updatedSections[sectionName];
		const { totalWidth, centralHeight, items } = section;

		let fixedWidthUsed = 0;
		const dynamicIndices: number[] = [];
		items.forEach((item, i) => {
			if (item.type === 'kitchenHood' || item.type === 'gap') {
				fixedWidthUsed += item.width || 0;
			} else {
				dynamicIndices.push(i);
			}
		});

		let leftover = totalWidth - fixedWidthUsed;
		if (leftover < 0) leftover = 0;

		const fullShutters = Math.floor(leftover / 16);
		const remainder = leftover % 16;
		const neededDynamic = fullShutters + (remainder > 0 ? 1 : 0);

		const currentDynamicCount = dynamicIndices.length;
		const newItems = [...items];

		if (currentDynamicCount < neededDynamic) {
			const toAdd = neededDynamic - currentDynamicCount;
			for (let i = 0; i < toAdd; i++) {
				newItems.push({
					type: 'shutter' as const,
					height: centralHeight,
					width: 0,
				});
			}
		} else if (currentDynamicCount > neededDynamic) {
			let toRemove = currentDynamicCount - neededDynamic;
			for (let i = newItems.length - 1; i >= 0 && toRemove > 0; i--) {
				const it = newItems[i];
				if (it.type !== 'kitchenHood' && it.type !== 'gap') {
					newItems.splice(i, 1);
					toRemove--;
				}
			}
		}

		const finalItems = newItems;
		const finalDynamicIndices: number[] = [];
		finalItems.forEach((it, i) => {
			if (it.type !== 'kitchenHood' && it.type !== 'gap') {
				finalDynamicIndices.push(i);
			}
		});

		let newLeftover = leftover;
		finalDynamicIndices.forEach(idx => {
			const it = finalItems[idx];
			if (it.height === undefined) {
				it.height = centralHeight;
			}
			if (newLeftover >= 16) {
				it.width = 16;
				newLeftover -= 16;
			} else {
				it.width = newLeftover;
				newLeftover = 0;
			}
		});

		updatedSections[sectionName].items = finalItems;
	};

	const handleInputChange = (
		section: string,
		index: number,
		field: 'height' | 'width',
		value: string
	) => {
		const updatedItems = [...sections[section].items];
		updatedItems[index][field] = parseFloat(value) || 0;

		const updatedSections = {
			...sections,
			[section]: { ...sections[section], items: updatedItems },
		};

		recalculateWidths(section, updatedSections);
		setSections(updatedSections);
	};

	const handleCentralHeightChange = (section: string, value: string) => {
		const updatedSections = {
			...sections,
			[section]: {
				...sections[section],
				centralHeight: parseFloat(value) || 0,
			},
		};

		recalculateWidths(section, updatedSections);
		setSections(updatedSections);
	};

	const handleTotalWidthChange = (section: string, value: string) => {
		const updatedSections = {
			...sections,
			[section]: {
				...sections[section],
				totalWidth: parseFloat(value) || 0,
			},
		};

		recalculateWidths(section, updatedSections);
		setSections(updatedSections);
	};

	const handleItemChange = (
		section: string,
		index: number,
		field: 'type',
		value: string
	) => {
		const updatedItems = [...sections[section].items];
		const typedValue = value as Item['type'];
		updatedItems[index][field] = typedValue;

		const updatedSections = {
			...sections,
			[section]: { ...sections[section], items: updatedItems },
		};

		recalculateWidths(section, updatedSections);
		setSections(updatedSections);
	};

	const addShutter = (section: string) => {
		const updatedItems = [
			...sections[section].items,
			{
				type: 'shutter' as const,
				height: sections[section].centralHeight,
				width: 16,
			},
		];

		const updatedSections = {
			...sections,
			[section]: { ...sections[section], items: updatedItems },
		};

		recalculateWidths(section, updatedSections);
		setSections(updatedSections);
	};

	const removeShutter = (section: string, index: number) => {
		const updatedItems = sections[section].items.filter((_, i) => i !== index);

		const updatedSections = {
			...sections,
			[section]: { ...sections[section], items: updatedItems },
		};

		recalculateWidths(section, updatedSections);
		setSections(updatedSections);
	};

	const handleBackgroundChange = (value: string) => {
		setSelectedBackground(value);
	};

	const triggerUpdate = (updatedSections: SectionsState) => {
		const transformedSections: TransformedSection[] = Object.keys(
			updatedSections
		).map(sectionName => ({
			name: sectionName,
			items: updatedSections[sectionName].items.map(item => ({
				...item,
				height: item.height !== undefined ? item.height * 5 : undefined,
				width: item.width !== undefined ? item.width * 5 : undefined,
				// Apply background image to shutters/glass/blank
				backgroundImage:
					item.type !== 'gap' && item.type !== 'kitchenHood'
						? selectedBackground
						: undefined,
			})),
			width: updatedSections[sectionName].totalWidth * 5,
			align: sectionName === 'middle' ? 'items-start' : 'items-end',
		}));

		transformedSections.splice(2, 0, {
			name: 'gap',
			count: 1,
			height: 24 * 5,
			width: 80,
			isGap: true,
			align: 'items-start',
			items: [
				{
					name: 'gap',
					count: 1,
					height: 24 * 5,
					width: 80,
					type: 'gap',
				},
			],
		});

		updateSections(transformedSections);
	};

	// Use effect to trigger update whenever sections or selectedBackground changes
	useEffect(() => {
		triggerUpdate(sections);
	}, [sections, selectedBackground]); // now we re-run triggerUpdate whenever these dependencies change

	return (
		<div className="space-y-4">
			<div className="text-lg font-semibold">Kitchen Configuration</div>

			{/* Background Image Selection Gallery */}
			<div className="space-y-2">
				<label className="text-sm font-medium text-gray-700 mb-1">
					Shutter Background:
				</label>
				<div className="flex items-center space-x-3">
					{backgroundOptions.map(opt => (
						<div
							key={opt.value}
							className={`relative w-16 h-16 border cursor-pointer hover:border-blue-500 transition ${
								selectedBackground === opt.value
									? 'border-blue-500'
									: 'border-gray-300'
							}`}
							onClick={() => handleBackgroundChange(opt.value)}
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
							{selectedBackground === opt.value && (
								<div className="absolute inset-0 border-2 border-blue-500 pointer-events-none"></div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="flex flex-wrap gap-6">
				{Object.keys(sections).map(sectionName => (
					<div
						key={sectionName}
						className="flex-1 rounded p-2 min-w-[250px] space-y-2 border"
					>
						<div className="flex items-start justify-between pb-1">
							<h3 className="uppercase text-base font-medium">
								{sectionName} <br /> Section
							</h3>
							<div className="flex flex-col items-center space-y-1">
								<div className="flex flex-col">
									<label className="text-xs text-gray-700">H (in)</label>
									<InputNumber
										value={sections[sectionName].centralHeight.toString()}
										placeholder="H"
										onChange={value =>
											handleCentralHeightChange(sectionName, value)
										}
									/>
								</div>
								<div className="flex flex-col">
									<label className="text-xs text-gray-700">W (in)</label>
									<InputNumber
										value={sections[sectionName].totalWidth.toString()}
										placeholder="W"
										onChange={value =>
											handleTotalWidthChange(sectionName, value)
										}
									/>
								</div>
							</div>
						</div>

						{sections[sectionName].items.map((item, index) => (
							<div key={index} className="flex items-end gap-2 text-sm">
								<div className="flex flex-col">
									<span className="text-xs text-gray-700 mb-1">Type</span>
									<Dropdown
										label="Type"
										options={itemTypes}
										selectedOption={item.type}
										onOptionSelect={value =>
											handleItemChange(sectionName, index, 'type', value)
										}
									/>
								</div>

								{item.type !== 'gap' && item.type !== 'kitchenHood' && (
									<div className="flex items-end">
										{visibleFields[`${sectionName}-${index}-height`] ? (
											<div className="flex items-end space-x-1">
												<div className="flex flex-col">
													<label className="text-xs text-gray-700">
														H (in)
													</label>
													<InputNumber
														value={item.height?.toString() || '0'}
														placeholder="H"
														onChange={value =>
															handleInputChange(
																sectionName,
																index,
																'height',
																value
															)
														}
													/>
												</div>
												<button
													type="button"
													onClick={() =>
														toggleFieldVisibility(sectionName, index, 'height')
													}
													className="bg-green-500 text-white px-1 py-1 rounded hover:bg-green-600 transition"
												>
													<Check size={14} />
												</button>
											</div>
										) : (
											<button
												type="button"
												onClick={() =>
													toggleFieldVisibility(sectionName, index, 'height')
												}
												className="bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-600 transition"
											>
												<Edit2 size={14} />
											</button>
										)}
									</div>
								)}

								{(item.type === 'gap' || item.type === 'kitchenHood') && (
									<div className="flex items-end">
										{visibleFields[`${sectionName}-${index}-width`] ? (
											<div className="flex items-end space-x-1">
												<div className="flex flex-col">
													<label className="text-xs text-gray-700">
														W (in)
													</label>
													<InputNumber
														value={item.width?.toString() || '0'}
														placeholder="W"
														onChange={value =>
															handleInputChange(
																sectionName,
																index,
																'width',
																value
															)
														}
													/>
												</div>
												<button
													type="button"
													onClick={() =>
														toggleFieldVisibility(sectionName, index, 'width')
													}
													className="bg-green-500 text-white px-1 py-1 rounded hover:bg-green-600 transition"
												>
													<Check size={14} />
												</button>
											</div>
										) : (
											<button
												type="button"
												onClick={() =>
													toggleFieldVisibility(sectionName, index, 'width')
												}
												className="bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-600 transition"
											>
												<Edit2 size={14} />
											</button>
										)}
									</div>
								)}

								<button
									type="button"
									onClick={() => {
										removeShutter(sectionName, index);
									}}
									className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600 transition"
								>
									<Trash size={14} />
								</button>
							</div>
						))}

						<button
							type="button"
							onClick={() => addShutter(sectionName)}
							className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 transition"
						>
							<Plus size={14} />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
