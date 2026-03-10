import { mockEquipments } from "@/src/shared/api/mocks/equipments";
import { Equipment } from "@/src/shared/types/types";

export async function getEquipments(): Promise<Equipment[]> {
	// Для разработки - моки
	return new Promise((resolve) => {
		setTimeout(() => resolve(mockEquipments), 500);
	});
}

export async function getModelById(id: number): Promise<Equipment> {
	const model = mockEquipments.find((p) => p.id === id);

	if (!model) {
		throw new Error("Product not found");
	}

	return model;
}
