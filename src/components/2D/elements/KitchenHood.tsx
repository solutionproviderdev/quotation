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

export default KitchenHood;
