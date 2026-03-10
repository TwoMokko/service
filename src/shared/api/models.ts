import { mockModels } from "@/src/shared/api/mocks/models";
import { Model } from "@/src/shared/types/types";

export async function getModels(): Promise<Model[]> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(mockModels), 500);
	});

	// try {
	// 	const response = await fetch('https://peleton-box.ru/api/v2/site-info/models', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({"site_id": 186}),
	// 		// next: { revalidate: 86400 }
	// 	});
	//
	// 	if (!response.ok) {
	// 		throw new Error(`HTTP error! status: ${response.status}`);
	// 	}
	//
	// 	// console.log('models:', response.json());
	// 	return await response.json();
	// } catch (error) {
	// 	console.error('Error:', error);
	// 	throw error;
	// } finally {
	// 	// Для разработки - моки
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => resolve(mockModels), 500);
	// 	});
	// }
}

export async function getModelById(id: number): Promise<Model> {
	const model = mockModels.find((p) => p.id === id);

	if (!model) {
		throw new Error("Product not found");
	}

	return model;
}
