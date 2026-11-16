import { Metadata } from "next";

import { metaDataServicesPage, sectionTitles } from "@/src/shared/config";
import { getAllCategoriesWithServices } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Banner } from "@/src/shared/ui/banner/Banner";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { InfoBlock, InfoBlockProps } from "@/src/shared/ui/infoBlock/InfoBlock";
import { Brands } from "@/src/widgets/brand";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { Services } from "@/src/widgets/services/ui/Services";

export const metadata: Metadata = metaDataServicesPage;

export default function ServicesPage() {
	const categories = getAllCategoriesWithServices();

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
	];

	const description = (
		<>
			Любые услуги по ремонту и обслуживанию автомобилей.
			<br />В стоимость услуг уже включены необходимые работы, запасные части и расходные
			материалы.
		</>
	);

	const infoBlockData: InfoBlockProps = {
		title: "Рыба текст на 5000 символов",
		content: [
			{
				paragraphs: [
					"Следует отметить, что высокое качество позиционных исследований требует определения и уточнения распределения внутренних резервов и ресурсов. Наше дело не так однозначно, как может показаться: глубокий уровень погружения позволяет выполнить важные задания по разработке первоочередных требований. Противоположная точка зрения подразумевает, что тщательные исследования конкурентов набирают популярность среди определенных слоев населения, а значит, должны быть своевременно верифицированы. А ещё представители современных социальных резервов в равной степени предоставлены сами себе. Но консультация с широким активом представляет собой интересный эксперимент проверки прогресса профессионального сообщества. Повседневная практика показывает, что высокотехнологичная концепция общественного уклада предполагает независимые способы реализации глубокомысленных рассуждений. Таким образом, перспективное планирование обеспечивает широкому кругу (специалистов) участие в формировании поэтапного и последовательного развития общества.",
				],
			},
		],
	};

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<Banner
				titlePage
				title="Услуги официального сервиса"
				description={description}
				imageSrc="/images/services/services-banner-desk.png"
			/>
			<Services services={categories} />
			<Brands title="Ремонт и обслуживание популярных брендов" />
			<section className="container">
				<InfoBlock content={infoBlockData.content} title={infoBlockData.title} />
			</section>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
