import { Metadata } from "next";

import { metaDataServicesPage } from "@/src/shared/config";
import { Services } from "@/src/widgets/services";

export const metadata: Metadata = metaDataServicesPage;

export default function Policy() {
	return (
		<div className="other-page">
			<Services />
		</div>
	);
}
