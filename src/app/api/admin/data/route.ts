import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data/services.json');

export async function GET() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch {
        // Если файла нет - возвращаем пустые данные
        return NextResponse.json({ services: {}, categories: {} });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
        await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка сохранения' }, { status: 500 });
    }
}