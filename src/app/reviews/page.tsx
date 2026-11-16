import { Metadata } from "next";

import { metaDataReviewsPage, sectionTitles } from "@/src/shared/config";
import { getAllReviews } from "@/src/shared/data/reviews";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { ReviewsGrid } from "@/src/widgets/reviews/ui/ReviewsGrid";

export const metadata: Metadata = metaDataReviewsPage;

export default function ReviewsPage() {
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Отзывы", href: "/reviews" },
	];

	const reviews = getAllReviews();

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<ReviewsGrid reviews={reviews} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
