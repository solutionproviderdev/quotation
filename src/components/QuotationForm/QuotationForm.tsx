import React, { useEffect, useState } from 'react';
import { ProjectTypeSelector } from './ProjectTypeSelector';
import { AreaSelector } from './AreaSelector';
import { AreaDetails } from './AreaDetails';
import { ProductSelector } from './ProductSelector';
import { ProductMeasurement } from './ProductMeasurement';

export const QuotationForm = () => {
	const [formData, setFormData] = useState({
		projectType: '',
		projectSubcategory: '',
		area: '',
		layout: '',
		product: '',
		itemType: '',
		series: '',
		measurements: {
			A: '',
			B: '',
			C: '',
			D: '',
		},
		productMeasurement: {
			length: '',
			height: '',
			depth: '',
		},
	});

	const idalDataModel = {
		projectType: 'Residencial',
		projectSubcategory: 'Single Appartment',
		areas: [
			{
				area: 'Kitchen Area',
				layout: 'L-Shaped',
				measurements: {
					A: '10',
					B: '10',
					C: '10',
					D: '10',
				},
				products: [
					{
						product: 'Kitchen Cabinet',
						itemType: 'Cabinet',
						series: 'Series 1',
						measurements: {
							length: '10',
							height: '10',
							depth: '10',
						},
					},
				],
			},
		],
	};

	useEffect(() => {
		console.log('formData:', formData.product);
	}, [formData]);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validation check for required fields
		if (
			!formData.projectType ||
			!formData.area ||
			!formData.product ||
			!formData.series
		) {
			// alert('Please fill in all required fields.');
			return;
		}

		setIsSubmitting(true);

		try {
			// alert('Quotation saved successfully!');
		} catch (error) {
			console.error('Error saving quotation:', error);
			// alert('Error saving quotation');
		} finally {
			setIsSubmitting(false);
		}
	};

	const isProjectSubcategorySelected = !!formData.projectSubcategory;
	const isAreaSelected = !!formData.area;
	const isSeriseSelected = !!formData.series;

	return (
		<form onSubmit={handleSubmit} className="space-y-4 w-full">
			<div className="flex items-start justify-center space-x-2">
				{/* Project Type Selector */}
				<div className="flex-1">
					<ProjectTypeSelector
						selectedType={formData.projectType}
						selectedSubcategory={formData.projectSubcategory}
						onTypeChange={type =>
							setFormData({
								...formData,
								projectType: type,
								projectSubcategory: '',
							})
						}
						onSubcategoryChange={subcategory =>
							setFormData({ ...formData, projectSubcategory: subcategory })
						}
					/>
				</div>

				{isProjectSubcategorySelected && (
					<div className="flex-1">
						<AreaSelector
							selectedArea={formData.area}
							selectedLayout={formData.layout}
							onAreaChange={area =>
								setFormData({ ...formData, area, layout: '' })
							}
							onLayoutChange={layout => setFormData({ ...formData, layout })}
						/>
					</div>
				)}
			</div>

			{isAreaSelected && (
				<div className="flex-1">
					<AreaDetails
						measurements={formData.measurements}
						onMeasurementsChange={measurements =>
							setFormData({ ...formData, measurements })
						}
					/>
				</div>
			)}

			{/* Product Selector */}
			{isAreaSelected && (
				<div>
					<ProductSelector
						selectedProduct={formData.product}
						selectedItemType={formData.itemType}
						selectedSeries={formData.series}
						onProductChange={product => {
							setFormData({
								...formData,
								product,
								itemType: '',
							});
						}}
						onItemTypeChange={itemType =>
							setFormData({ ...formData, itemType })
						}
						onSeriesChange={series => setFormData({ ...formData, series })}
					/>
				</div>
			)}

			{isSeriseSelected && (
				<div>
					<ProductMeasurement
						measurements={formData.productMeasurement}
						onMeasurementsChange={updatedMeasurements =>
							setFormData({
								...formData,
								productMeasurement: {
									...updatedMeasurements,
								},
							})
						}
					/>
				</div>
			)}

			{/* Buttons */}
			<div className="flex justify-end space-x-2">
				<button
					type="button"
					className="px-3 py-1 text-sm font-medium text-gray-700 hover:underline"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className={`px-3 py-1 rounded-md text-sm font-medium ${
						isSubmitting
							? 'bg-gray-400 cursor-not-allowed text-white'
							: 'bg-blue-600 hover:bg-blue-700 text-white'
					}`}
				>
					{isSubmitting ? 'Saving...' : 'Save Quotation'}
				</button>
			</div>
		</form>
	);
};
