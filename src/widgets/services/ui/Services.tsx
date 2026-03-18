import { getServices } from "@/src/shared/api/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { ServicesClient } from "@/src/widgets/services/ui/ServicesClient";

export async function Services() {
	const services: CategoryWithServices[] = getServices();

	return <ServicesClient services={services} />;
}
