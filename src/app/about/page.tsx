import { Metadata } from "next";

import { metaDataAboutPage, sectionTitles } from "@/src/shared/config";
import { getAllCategoriesWithServices } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { InfoBlock } from "@/src/shared/ui/infoBlock/InfoBlock";
import { About, AboutPageInfo } from "@/src/widgets/about";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { Reels } from "@/src/widgets/reels";
import { Reviews } from "@/src/widgets/reviews";
import { ServicesMini } from "@/src/widgets/services/ui/ServicesMini";

export const metadata: Metadata = metaDataAboutPage;

export default function AboutPage() {
	const categories = getAllCategoriesWithServices();
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "О нас", href: "/about" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<AboutPageInfo />
			<Reels />
			<div className="container">
				<InfoBlock
					content={[
						{
							title: "",
							paragraphs: [
								"Следует отметить, что высокое качество позиционных исследований требует определения и уточнения распределения внутренних резервов и ресурсов. Наше дело не так однозначно, как может показаться: глубокий уровень погружения позволяет выполнить важные задания по разработке первоочередных требований. Противоположная точка зрения подразумевает, что тщательные исследования конкурентов набирают популярность среди определённых слоёв населения, а значит, должны быть своевременно верифицированы. А ещё представители современных социальных резервов в равной степени предоставлены сами себе. Но консультация с широким активом представляет собой интересный эксперимент проверки прогресса профессионального сообщества. Повседневная практика показывает, что высокотехнологичная концепция общественного уклада предполагает независимые способы реализации глубокомысленных рассуждений. Таким образом, перспективное планирование обеспечивает широкому кругу (специалистов) участие в формировании поэтапного и последовательного развития общества.",
							],
						},
					]}
					title="Рыба текст на 1000 символов"
				/>
			</div>
			<Reviews
				idSection={SectionId.REVIEWS}
				titleSection={sectionTitles[SectionId.REVIEWS]}
			/>
			<About />
			<ServicesMini services={categories} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
