import { getService } from "@/src/shared/api/services";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: Promise<{ category: string, slug: string }>  }): Promise<Metadata> {
    const { category, slug } = await params

    try {
        const service = await getService(category, slug)

        return {
            title: service.title,
            description: service.description
        }
    } catch {
        return {
            title: "Услуга не найдена",
            description: "Страница услуги не найдена",
        };
    }
}

export default async function ServicePage({ params }: { params: Promise<{ category: string, slug: string }> }) {
    const { category, slug } = await params
    const service = await getService(category, slug)

    return <div className="other-page container">
        <h1>{service.title}</h1>
    </div>
}