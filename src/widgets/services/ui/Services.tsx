import { getServices } from "@/src/shared/api/services";
import { ServicesClient } from "@/src/widgets/services/ui/ServicesClient";

interface ServicesProps {
	buttonShowAll?: boolean;
}
export async function Services({ buttonShowAll = false }: ServicesProps) {
	const services = await getServices();

	return <ServicesClient services={services} buttonShowAll={buttonShowAll} />;
}
