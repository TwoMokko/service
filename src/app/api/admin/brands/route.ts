import path from "path";

import { NextResponse } from "next/server";

import { Brand } from "@/src/shared/data/brands/types";

import { readFile, writeFile } from "fs/promises";

const BRANDS_FILE_PATH = path.join(process.cwd(), "data/brands.json");

export async function GET() {
	try {
		const file = await readFile(BRANDS_FILE_PATH, "utf-8");
		const data: Record<string, Brand> = JSON.parse(file);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Ошибка чтения брендов:", error);

		return NextResponse.json({ error: "Не удалось загрузить бренды" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const data: Record<string, Brand> = await request.json();

		await writeFile(BRANDS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Ошибка сохранения брендов:", error);

		return NextResponse.json({ error: "Не удалось сохранить бренды" }, { status: 500 });
	}
}
