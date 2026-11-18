import path from "path";

import { NextResponse } from "next/server";

import type { ReviewsData } from "@/src/shared/data/reviews/types";

import { readFile, writeFile } from "fs/promises";

const REVIEWS_FILE_PATH = path.join(process.cwd(), "data/reviews.json");

export async function GET() {
	try {
		const file = await readFile(REVIEWS_FILE_PATH, "utf-8");
		const data: ReviewsData = JSON.parse(file);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Ошибка чтения отзывов:", error);

		return NextResponse.json({ error: "Не удалось загрузить отзывы" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const data: ReviewsData = await request.json();

		await writeFile(REVIEWS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Ошибка сохранения отзывов:", error);

		return NextResponse.json({ error: "Не удалось сохранить отзывы" }, { status: 500 });
	}
}
