import { getServices } from "@/src/shared/api/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { ServicesClient } from "@/src/widgets/services/ui/ServicesClient";

export async function Services({ titlePage = false }: { titlePage?: boolean }) {
	const services: CategoryWithServices[] = getServices();

	return <ServicesClient services={services} titlePage={titlePage} />;
}
