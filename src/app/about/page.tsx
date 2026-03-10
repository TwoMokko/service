import { Metadata } from "next";

import { metaDataAboutPage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Reels } from "@/src/widgets/reels";
import { Reviews } from "@/src/widgets/reviews";

export const metadata: Metadata = metaDataAboutPage;

export default function Policy() {
	return (
		<div className="other-page">
			<div className="container">
				<h1>О нас</h1>
				<p>Текст о нас</p>
			</div>
			<Reels />
			<Reviews
				idSection={SectionId.REVIEWS}
				titleSection={sectionTitles[SectionId.REVIEWS]}
			/>
		</div>
	);
}
