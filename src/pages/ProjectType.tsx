import React, { useEffect, useState } from 'react';
import { ProjectType } from '../types/model';
import { getAllProjectTypes } from '../lib/db';

export const ProjectTypePage: React.FC = () => {
	const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjectTypes = async () => {
			setLoading(true);
			try {
				const data = await getAllProjectTypes(); // Fetch all project types from DB
				setProjectTypes(data);
			} catch (error) {
				console.error('Error fetching project types:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProjectTypes();
	}, []);

	if (loading) {
		return <div className="text-center py-4">Loading project types...</div>;
	}

	if (projectTypes.length === 0) {
		return <div className="text-center py-4">No project types available.</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold mb-4">Project Types</h1>
			<table className="table-auto w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-100">
						<th className="border border-gray-300 px-4 py-2">Project Type</th>
						<th className="border border-gray-300 px-4 py-2">Subcategories</th>
						<th className="border border-gray-300 px-4 py-2">
							Areas & Layouts
						</th>
					</tr>
				</thead>
				<tbody>
					{projectTypes.map(projectType => (
						<tr key={projectType.id}>
							<td className="border border-gray-300 px-4 py-2">
								{projectType.name}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								<ul className="list-disc list-inside">
									{projectType.subcategories.map(subcategory => (
										<li key={subcategory.id}>{subcategory.name}</li>
									))}
								</ul>
							</td>
							<td className="border border-gray-300 px-4 py-2">
								<ul className="list-disc list-inside">
									{projectType.subcategories.map(subcategory =>
										subcategory.areas.map(area => (
											<li key={area.id}>
												<strong>{area.name}:</strong>{' '}
												{area?.layoutOptions &&
													area?.layoutOptions.length > 0 && (
														<span>
															Layouts: {area?.layoutOptions.join(', ')}
														</span>
													)}
											</li>
										))
									)}
								</ul>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
