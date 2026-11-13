import path from "path";

import { NextResponse } from "next/server";

import fs from "fs/promises";

const DATA_PATH = path.join(process.cwd(), "data/services.json");

interface ServicesData {
	services: Record<string, unknown>;
	categories: Record<string, unknown>;
}

function isValidData(data: unknown): data is ServicesData {
	if (!data || typeof data !== "object") return false;

	const value = data as Record<string, unknown>;

	return (
		!!value.services &&
		typeof value.services === "object" &&
		!Array.isArray(value.services) &&
		!!value.categories &&
		typeof value.categories === "object" &&
		!Array.isArray(value.categories)
	);
}

export async function GET() {
	try {
		const file = await fs.readFile(DATA_PATH, "utf-8");
		const data: unknown = JSON.parse(file);

		if (!isValidData(data)) {
			return NextResponse.json({ error: "Некорректная структура данных" }, { status: 500 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Ошибка чтения services.json:", error);

		return NextResponse.json({ error: "Не удалось прочитать данные" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const data: unknown = await request.json();

		if (!isValidData(data)) {
			return NextResponse.json({ error: "Некорректная структура данных" }, { status: 400 });
		}

		await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });

		await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Ошибка сохранения services.json:", error);

		return NextResponse.json({ error: "Ошибка сохранения" }, { status: 500 });
	}
}
