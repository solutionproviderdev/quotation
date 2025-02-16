import React from 'react';

interface GapProps {
	width: number;
}

export default function Gap({ width }: GapProps) {
	return (
		<div
			style={{
				width: `${width || 0}px`,
			}}
			className=""
		></div>
	);
}
