import React from 'react';
import { TransformedSection } from '../kitchen/KitchenForm';

interface ElevationProps {
	sections: TransformedSection[];
}

interface ShutterProps {
	height?: number;
	width?: number;
	withGlass?: boolean;
	backgroundImage?: string;
}

const Shutter: React.FC<ShutterProps> = ({
	height = 0,
	width = 0,
	withGlass,
	backgroundImage,
}) => {
	const style: React.CSSProperties = {
		height: `${height}px`,
		width: `${width}px`,
	};
	if (backgroundImage) {
		style.backgroundImage = `url(${backgroundImage})`;
		style.backgroundSize = 'cover';
		style.backgroundPosition = 'center';
	}

	return (
		<div
			style={style}
			className={`border-2 border-gray-800 ${withGlass ? 'p-2' : ''}`}
		>
			{withGlass && (
				<div
					style={{ height: '100%', width: '100%' }}
					className="border-2 border-gray-800 bg-blue-300 flex items-center justify-center"
				></div>
			)}
		</div>
	);
};

const Drawer: React.FC<{ width?: number }> = ({ width = 80 }) => {
	return (
		<div
			style={{
				width: `${width}px`,
			}}
			className="flex flex-col items-center justify-center"
		>
			<div
				style={{
					height: '20px',
					width: '100%',
				}}
				className="border-2 border-gray-800"
			></div>
			<div
				style={{
					height: '60px',
					width: `${width / 4}px`,
				}}
				className="border-2 border-gray-800"
			></div>
			<div
				style={{
					height: '20px',
					width: `${width * 0.75}px`,
				}}
				className="border-2 border-gray-800"
			></div>
		</div>
	);
};

const KitchenHood: React.FC<{ width?: number }> = ({ width = 80 }) => {
	return (
		<div
			style={{
				width: `${width}px`,
			}}
			className="flex flex-col items-center justify-center"
		>
			<div
				style={{
					height: '20px',
					width: '100%',
				}}
				className="border-2 border-gray-800"
			></div>
			<div
				style={{
					height: '60px',
					width: `${width / 4}px`,
				}}
				className="border-2 border-gray-800"
			></div>
			<div
				style={{
					height: '20px',
					width: `${width * 0.75}px`,
				}}
				className="border-2 border-gray-800"
			></div>
		</div>
	);
};

const Elevation: React.FC<ElevationProps> = ({ sections }) => {
	return (
		<div className="flex flex-col items-start justify-center">
			{sections.map((section, idx) => (
				<div key={idx} className={`flex ${section.align} justify-center`}>
					{section.items
						? section.items.map((item, i) => {
								if (item.type === 'gap') {
									// Render gap
									return (
										<div
											key={i}
											style={{
												height: `${item.height || section.height || 0}px`,
												width: `${item.width || section.width || 0}px`,
											}}
										></div>
									);
								} else if (item.type === 'blank') {
									return (
										<div
											key={i}
											style={{
												height: `${item.height || section.height || 0}px`,
												width: `${item.width || section.width || 0}px`,
											}}
											className="border-2 border-gray-800"
										></div>
									);
								} else if (item.type === 'kitchenHood') {
									return (
										<KitchenHood
											key={i}
											width={item.width || section.width || 80}
										/>
									);
								} else {
									// Shutter or Glass
									const withGlass = item.type === 'glass';
									return (
										<Shutter
											key={i}
											height={item.height || section.height}
											width={item.width || section.width}
											withGlass={withGlass}
											backgroundImage={
												item.backgroundImage as string | undefined
											}
										/>
									);
								}
						  })
						: section.count
						? Array.from({ length: section.count }).map((_, i) => (
								<div
									key={i}
									style={{
										height: `${section.height || 0}px`,
										width: `${section.width || 0}px`,
									}}
									className={`${
										section.isGap ? '' : 'border-2 border-gray-800'
									}`}
								></div>
						  ))
						: null}
				</div>
			))}
		</div>
	);
};

export default Elevation;
