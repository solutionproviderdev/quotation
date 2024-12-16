import { useState } from 'react';
import Elevation from '../components/2D/Elevation';
import KitchenForm from '../components/kitchen/KitchenForm';
import {
	TransformedSection,
} from '../components/kitchen/KitchenForm';


export default function Quotations() {
	const [sections, setSections] = useState<TransformedSection[]>([]);

	return (
		<div className="flex items-start justify-between gap-10">
			<div className="flex-1">
				<KitchenForm updateSections={setSections} />
			</div>
			<div className="flex-2">
				<Elevation sections={sections} />
			</div>
		</div>
	);
}
