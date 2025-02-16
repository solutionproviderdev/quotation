import React from 'react';
import { FaCircle } from 'react-icons/fa';
import KitchenHood from './elements/KitchenHood';
import Gap from './elements/Gap';

export interface CabinetWithShelveTypes {
	width?: number;
	height?: number;
	shutterType: 'plain' | 'withGlass' | 'open' | 'kitchenHood' | 'gap';
	shelve?: boolean;
	hasScating?: boolean;
	backgroundImage?: string;
	hasDrawers?: boolean;
	drawersType?:
		| 'drawerWithShutter'
		| 'wasteSystem'
		| 'threeDrawer'
		| 'bottleRack';
	drawerHeight?: number;
}

export interface CabinetWithShelveProps {
	cabinet: CabinetWithShelveTypes;
	isSelected: boolean;
	setIsSelected: (isSelected: boolean) => void;
}

const CabinetWithShelve: React.FC<CabinetWithShelveProps> = ({
	cabinet: {
		width = 80,
		height = 160,
		shutterType = 'plain',
		shelve = true,
		hasScating = true,
		backgroundImage = '',
		hasDrawers = false,
		drawersType = 'drawerWithShutter',
		drawerHeight = 30,
	},
	isSelected = false,
	setIsSelected,
}) => {
	// Calculate height excluding scating if applicable
	const effectiveHeight =
		height -
		(hasScating ? 10 : 0) -
		(hasDrawers && drawersType === 'drawerWithShutter' ? drawerHeight : 0);

	const multipleShutters = width > 80;

	// Inline styles for the shutter
	const shutterStyle: React.CSSProperties = {
		height: `${effectiveHeight}px`,
		width: `${width - 2}px`,
		backgroundColor: backgroundImage ? undefined : 'white',
		position: 'absolute',
		opacity: shutterType === 'plain' ? 0.5 : 1,
		top: 0,
		left: 0,
		right: 0,
		...(backgroundImage && {
			backgroundImage: `url(${backgroundImage})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}),
	};

	// Generate shelf elements
	const renderShelves = () => {
		if (shelve) {
			return Array.from({ length: 2 - 1 }, (_, index) => (
				<div
					key={index}
					className="border-b border-gray-800 w-full"
					style={{
						height: `${effectiveHeight / 2}px`,
						position: 'relative',
						// zIndex: 1,
						opacity: shutterType === 'plain' ? 0.5 : 1,
					}}
				></div>
			));
		} else {
			return null;
		}
	};

	// Render shutter based on shutterType
	const renderShutter = () => {
		switch (shutterType) {
			case 'plain':
				return (
					<div
						style={shutterStyle}
						className="absolute top-0 left-0 bottom-0 right-0 flex"
					>
						<div className="w-full h-full opacity-50 border-b border-gray-800"></div>
						{multipleShutters && (
							<div className="w-full h-full opacity-50 border-b border-x border-gray-800"></div>
						)}
					</div>
				);
			case 'withGlass':
				return (
					<div
						style={shutterStyle}
						className="absolute top-0 left-0 bottom-0 right-0 flex"
					>
						<div className="w-full h-full p-2 opacity-50 border-b border-x border-gray-800">
							<div className="w-full h-full border border-gray-800 bg-blue-300"></div>
						</div>
						{multipleShutters && (
							<div className="w-full h-full p-2 opacity-50 border-b border-x border-gray-800">
								<div className="w-full h-full border border-gray-800 bg-blue-300"></div>
							</div>
						)}
					</div>
				);
			case 'open':
				return null;
			default:
				return null;
		}
	};

	// Render drawers if applicable
	const renderDrawers = () => {
		switch (drawersType) {
			case 'drawerWithShutter':
				return (
					<div
						className="w-full flex pt-2 justify-center border-b border-gray-800"
						style={{
							height: `${drawerHeight}px`,
							...(backgroundImage && {
								backgroundImage: `url(${backgroundImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}),
						}}
					>
						<FaCircle className="text-[4px] font-bold" />
					</div>
				);
			case 'wasteSystem':
				return (
					<>
						<div
							className="w-full flex pt-2 justify-center border-b border-gray-800 flex-1"
							style={{
								// height: `${drawerHeight}px`,
								...(backgroundImage && {
									backgroundImage: `url(${backgroundImage})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}),
							}}
						>
							<FaCircle className="text-[4px] font-bold" />
						</div>
						<div
							className="w-full flex pt-2 justify-center border-b border-gray-800 flex-1"
							style={{
								// height: `${drawerHeight}px`,
								...(backgroundImage && {
									backgroundImage: `url(${backgroundImage})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}),
							}}
						>
							<FaCircle className="text-[4px] font-bold" />
						</div>
					</>
				);
			case 'threeDrawer':
				return (
					<>
						<div
							className="w-full flex pt-2 justify-center border-b border-gray-800"
							style={{
								height: `${30}px`,
								...(backgroundImage && {
									backgroundImage: `url(${backgroundImage})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}),
							}}
						>
							<FaCircle className="text-[4px] font-bold" />
						</div>
						<div
							className="w-full flex pt-2 justify-center border-b border-gray-800 flex-1"
							style={{
								height: `${45}px`,
								...(backgroundImage && {
									backgroundImage: `url(${backgroundImage})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}),
							}}
						>
							<FaCircle className="text-[4px] font-bold" />
						</div>
						<div
							className="w-full flex pt-2 justify-center border-b border-gray-800 flex-1"
							style={{
								height: `${70}px`,
								...(backgroundImage && {
									backgroundImage: `url(${backgroundImage})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}),
							}}
						>
							<FaCircle className="text-[4px] font-bold" />
						</div>
					</>
				);
			case 'bottleRack':
				return (
					<>
						<div
							className="w-full flex pt-2 justify-center border-b border-gray-800"
							style={{
								height: `${30}px`,
								...(backgroundImage && {
									backgroundImage: `url(${backgroundImage})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}),
							}}
						>
							<FaCircle className="text-[4px] font-bold" />
						</div>
						<div
							className="w-full flex pt-2 justify-center border-b border-gray-800 flex-1"
							style={{
								height: `${45}px`,
								...(backgroundImage && {
									backgroundImage: `url(${backgroundImage})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}),
							}}
						>
							<FaCircle className="text-[4px] font-bold" />
						</div>
					</>
				);
			default:
				break;
		}
	};

	if (shutterType === 'gap') {
		return <Gap width={width} />;
	}

	if (shutterType === 'kitchenHood') {
		return <KitchenHood width={width} />;
	}

	return (
		<div
			style={{
				width: `${width}px`,
				height: `${height}px`,
				...(backgroundImage && {
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}),
			}}
			className={`flex flex-col items-center justify-center border cursor-pointer ${
				isSelected ? 'border-blue-500' : 'border-gray-800'
			}`}
			onClick={() => setIsSelected(!isSelected)}
		>
			{/* Drawers */}
			{hasDrawers && renderDrawers()}

			{/* Main Cabinet */}
			{!hasDrawers || (hasDrawers && drawersType === 'drawerWithShutter') ? (
				<div
					className={`w-full relative ${
						shutterType === 'withGlass' ? 'px-2' : ''
					} flex-1`}
					style={{ height: `${effectiveHeight}px` }}
				>
					{/* Shelves */}
					{renderShelves()}

					{/* Shutter */}
					{renderShutter()}
				</div>
			) : null}

			{/* Scating */}
			{hasScating && (
				<div
					className="w-full border border-gray-800 h-[10px]"
					style={{
						...(backgroundImage && {
							backgroundImage: `url(${backgroundImage})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}),
					}}
				/>
			)}
		</div>
	);
};
export default CabinetWithShelve;
