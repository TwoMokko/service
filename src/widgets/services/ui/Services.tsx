import { getServices } from "@/src/shared/api/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { ServicesClient } from "@/src/widgets/services/ui/ServicesClient";

interface ServicesProps {
	buttonShowAll?: boolean;
}
export async function Services({ buttonShowAll = false }: ServicesProps) {
	const services: CategoryWithServices[] = getServices();

	return <ServicesClient services={services} buttonShowAll={buttonShowAll} />;
}
