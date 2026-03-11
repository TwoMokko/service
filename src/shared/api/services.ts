import { mockService } from "@/src/shared/api/mocks/services";
import { ServiceCategory, ServiceItem } from "@/src/shared/types/types";

export async function getServices(): Promise<ServiceCategory[]> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(mockService), 500);
	});

	// try {
	// 	const response = await fetch('https://peleton-box.ru/api/v2/site-info/services', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({"site_id": 186}),
	// 		// next: { revalidate: 86400 } // раз в сутки обновление
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

export async function getServiceCategory(href: string): Promise<ServiceCategory> {
	const currentCategory = mockService.find((item) => item.href === href);
	// const service = currentCategory?.items.find((p) => p.href === slug)

	// console.log({service})

	if (!currentCategory) {
		throw new Error("service not found");
	}

	return currentCategory;

	// try {
	// 	const response = await fetch('https://peleton-box.ru/api/v2/site-info/services', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({"site_id": 186, slug}),
	// 		// next: { revalidate: 86400 } // раз в сутки обновление
	// 	});
	//
	// 	if (!response.ok) {
	// 		throw new Error(`HTTP error! status: ${response.status}`);
	// 	}
	//
	// 	// console.log('services:', response.json());
	// 	return await response.json();
	// } catch (error) {
	// 	console.error('Error:', error);
	// 	throw error;
	// } finally {
	// 	// Для разработки - моки
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => resolve(mockService), 500);
	// 	});
	// }
}
