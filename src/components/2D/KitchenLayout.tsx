export default function KitchenLayout() {
	return (
		<div className="inline-block border-2 border-black p-2">
			{/* Top row of tall cabinets */}
			<div className="flex space-x-0">
				{/* 3 tall cabinets */}
				<div className="border-r border-black w-16 h-40"></div>
				<div className="border-r border-black w-16 h-40"></div>
				<div className="border-r border-black w-16 h-40"></div>
				{/* 1 extra-wide tall cabinet */}
				<div className="border-r border-black w-16 h-40"></div>
			</div>

			{/* Row of glass-door cabinets (below top row) */}
			<div className="flex space-x-0 border-b border-black">
				{/* Each “glass” door has an outer frame and an inner horizontal line */}
				<div className="w-16 h-24 border-r border-black relative">
					<div className="absolute inset-1 border border-black"></div>
					<div className="absolute inset-x-1 top-1/2 h-[1px] bg-black"></div>
				</div>
				<div className="w-16 h-24 border-r border-black relative">
					<div className="absolute inset-1 border border-black"></div>
					<div className="absolute inset-x-1 top-1/2 h-[1px] bg-black"></div>
				</div>
				<div className="w-16 h-24 border-r border-black relative">
					<div className="absolute inset-1 border border-black"></div>
					<div className="absolute inset-x-1 top-1/2 h-[1px] bg-black"></div>
				</div>
				{/* Empty space or big cabinet to the right */}
				<div className="w-16 h-24"></div>
			</div>

			{/* Countertop (thin horizontal bar) */}
			<div className="w-[256px] h-1 bg-black mb-1" />

			{/* Base cabinets row */}
			<div className="flex space-x-0">
				{/* 3 base cabinets with small drawer knobs */}
				<div className="border-r border-black w-16 h-24 relative">
					{/* Drawer knob */}
					<div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
				</div>
				<div className="border-r border-black w-16 h-24 relative">
					<div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
				</div>
				<div className="border-r border-black w-16 h-24 relative">
					<div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
				</div>
				{/* Extra space to the right? (If needed) */}
				<div className="w-16 h-24"></div>
			</div>

			{/* Tall vertical cabinet on the right (like a pantry), with shelves */}
			<div className="relative border-t border-black mt-2 flex">
				{/* Left empty space: same total height as base row + top row if needed */}
				<div className="w-[192px]"></div>

				{/* The tall pantry with multiple “shelves” */}
				<div className="border-l border-black w-16 h-64 relative">
					{/* Each shelf is a horizontal border line inside */}
					<div className="absolute left-0 right-0 top-1/6 border-b border-black h-px"></div>
					<div className="absolute left-0 right-0 top-2/6 border-b border-black h-px"></div>
					<div className="absolute left-0 right-0 top-3/6 border-b border-black h-px"></div>
					<div className="absolute left-0 right-0 top-4/6 border-b border-black h-px"></div>
					<div className="absolute left-0 right-0 top-5/6 border-b border-black h-px"></div>
				</div>
			</div>
		</div>
	);
}
