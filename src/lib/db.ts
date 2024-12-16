import Dexie, { Table } from 'dexie';
import { Quotation, ProductCollection, ProjectType } from '../types/model'; // Importing the updated models

// Initialize JSON data for collections
import initialProjectTypes from './data/projectTypes.json'; // JSON for Project Types
import initialProducts from './data/products.json'; // JSON for Products

class QuotationDatabase extends Dexie {
	quotations!: Table<Quotation>;
	products!: Table<ProductCollection>;
	projectTypes!: Table<ProjectType>;

	constructor() {
		super('QuotationDB');

		this.version(1).stores({
			quotations: '++id, projectType, projectSubcategory, createdAt, updatedAt',
			products: 'id, name, type, series.name',
			projectTypes: 'id, name, subcategories.id, subcategories.areas.id',
		});
	}
}

export const db = new QuotationDatabase();

// Initialize collections from JSON data
export const initializeDatabase = async () => {
	// Check if the database is already initialized
	const projectTypeCount = await db.projectTypes.count();
	const productCount = await db.products.count();

	if (projectTypeCount === 0) {
		await db.projectTypes.bulkAdd(initialProjectTypes);
		console.log('Project types initialized');
	}

	if (productCount === 0) {
		await db.products.bulkAdd(initialProducts);
		console.log('Products initialized');
	}
};

// Initialize the database
initializeDatabase();

// Helper functions for database operations

// Quotations
export const addQuotation = async (
	quotation: Omit<Quotation, 'id' | 'createdAt' | 'updatedAt'>
) => {
	const now = new Date();
	return await db.quotations.add({
		...quotation,
		createdAt: now,
		updatedAt: now,
		id: '',
	});
};

export const updateQuotation = async (
	id: number,
	quotation: Partial<Quotation>
) => {
	return await db.quotations.update(id, {
		...quotation,
		updatedAt: new Date(),
	});
};

export const getAllOptions = async () => {
	// Fetch all data from the database
	const projectTypes = await db.projectTypes.toArray();
	const products = await db.products.toArray();

	// Combine and return as a single response
	return {
		projectTypes,
		products,
	};
};

export const deleteQuotation = async (id: number) => {
	return await db.quotations.delete(id);
};

export const getAllQuotations = async () => {
	return await db.quotations.toArray();
};

export const getQuotationById = async (id: number) => {
	return await db.quotations.get(id);
};

// Products
export const getAllProducts = async () => {
	return await db.products.toArray();
};

export const getProductById = async (id: string) => {
	return await db.products.get(id);
};

// Project Types
export const getAllProjectTypes = async () => {
	return await db.projectTypes.toArray();
};

export const getProjectTypeById = async (id: string) => {
	return await db.projectTypes.get(id);
};
