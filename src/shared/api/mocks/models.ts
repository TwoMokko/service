import { Model } from "@/src/shared/types/types";

export const mockModels: Model[] = [
	{
		id: 1,
		brand: "SWM",
		name: "Модель 1",
		slug: "model1",
		price: 1395000,
		recprice: 14580000,
		creditPay: 17880,
		colors: ["red", "grey", "blue", "black"],
	},
	{
		id: 2,
		brand: "SWM",
		name: "Модель 2",
		slug: "model2",
		price: 2678000,
		recprice: 15000200,
		creditPay: 17710,
		colors: ["green", "blue", "red"],
	},
	{
		id: 3,
		brand: "SWM",
		name: "Модель 3",
		slug: "model3",
		price: 3000,
		recprice: 1200,
		creditPay: 17250,
		colors: ["green", "blue", "red"],
	},
	{
		id: 4,
		brand: "SWM",
		name: "Модель 4",
		slug: "model4",
		price: 4000,
		recprice: 1200,
		creditPay: 16580,
		colors: ["green", "blue"],
	},
	{
		id: 6,
		brand: "OTHER",
		name: "Модель другой бренд",
		slug: "model5",
		price: 4000,
		recprice: 1200,
		creditPay: 14000,
		colors: ["green", "blue"],
	},
] as const;

// export type MockModel = typeof mockModels[number]
