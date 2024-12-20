import { useState, useRef } from 'react';
import Elevation from '../components/2D/Elevation';
import KitchenForm, {
	TransformedSection,
} from '../components/kitchen/KitchenForm';
import { useReactToPrint } from 'react-to-print';

export default function Quotations() {
	const [sections, setSections] = useState<TransformedSection[]>([]);

	// Create a ref to the Elevation component
	const elevationRef = useRef<HTMLDivElement>(null);

	// useReactToPrint hook to handle printing
	const handlePrint = useReactToPrint({
		contentRef: elevationRef, // specify the ref here
		documentTitle: 'Kitchen_Elevation',
	});

	return (
		<div className="flex items-start justify-between gap-10">
			<div className="flex-1">
				<KitchenForm updateSections={setSections} />
			</div>

			<div className="flex-2 flex flex-col items-end space-y-4">
				{/* Wrap Elevation in a div that we reference for printing */}
				<div ref={elevationRef} className="print-elevation">
					<Elevation sections={sections} />
				</div>

				<button
					type="button"
					onClick={handlePrint}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Print Elevation
				</button>
			</div>
		</div>
	);
}
