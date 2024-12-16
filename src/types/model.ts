// Specification and Series Types
export interface Specification {
	item: string; // Specification name (e.g., "Material")
	description: string; // Specification details (e.g., "Wood")
}

export interface Series {
	name: string; // Name of the series (e.g., "Economic", "Premium")
	price: number; // Price specific to the series
	specifications: Specification[]; // Specifications for the series
}

// ProductCollection Types
export interface ProductCollection {
	id: string; // Unique ID for the product
	name: string; // Product name (e.g., "Kitchen Cabinet")
	description: string; // General description
	category?: string; // Optional category field (e.g., "Furniture")
	type: string; // Product type (e.g., "Cabinet")
	series: Series[]; // List of series for this product
	imageUrl?: string; // Optional image URL for the product
}

// QuotationProduct Types
export interface QuotationProduct {
	id: string; // Product ID (matches the global collection ID)
	name: string; // Product name
	itemType: string; // Type of the product
	series: {
		name: string; // Selected series
		price: number; // Price of the selected series
		specifications: Specification[]; // Specifications for the series
	};
	measurements: {
		length: number; // Length in inches
		height: number; // Height in inches
		depth: number; // Depth in inches
		totalSqft: number; // Calculated area in square feet
	};
	finalPrice: number; // Final calculated price of the product
	notes?: string; // Optional user-provided notes
}

// Quotation Types
export interface Quotation {
	id: string; // Unique quotation ID
	contactInfo: {
		name: string;
		phone: string;
		email: string;
		address: string;
	};
	projectType: string; // Selected project type
	projectSubcategory: string; // Selected subcategory
	areas: {
		id: string; // Area ID
		name: string; // Area name
		layout: string; // Selected layout
		measurements: {
			A: number; // Measurement A in inches
			B: number; // Measurement B in inches
			C: number; // Measurement C in inches
			D: number; // Measurement D in inches
			totalArea: number; // Total calculated area
		};
		products: QuotationProduct[]; // List of products in the area
		areaFinalPrice: number; // Total price for this area
	}[];
	finalPrice: number; // Aggregated price of all areas
	status?: string; // Optional status field (e.g., "Draft," "Finalized")
	notes?: string; // Optional notes for the quotation
	createdAt: Date; // Creation date
	updatedAt: Date; // Last update date
}

// ProjectType, Subcategory, and Area Types
export interface ProjectType {
	id: string; // Unique ID for the project type
	name: string; // Name of the project type
	description?: string; // Optional description of the project type
	subcategories: Subcategory[]; // List of associated subcategories
}

export interface Subcategory {
	id: string; // Unique ID for the subcategory
	name: string; // Name of the subcategory
	description?: string; // Optional description of the subcategory
	areas: Area[]; // List of areas associated with the subcategory
}

export interface Area {
	id: string; // Unique ID for the area
	name: string; // Name of the area
	description?: string; // Optional description of the area
	layoutOptions?: string[]; // List of available layout types
	defaultLayout?: string; // Default layout type (optional)
}
