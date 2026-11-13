import React from "react";

import { InfoBlock, InfoBlockProps } from "@/src/shared/ui/infoBlock/InfoBlock";
import { PlayIcon } from "@/src/shared/ui/playIcon/PlayIcon";

import styles from "./AboutPageInfo.module.scss";

const mockData: InfoBlockProps = {
	title: "Официальный сервисный центр PELETON",
	content: [
		{
			title: "",
			paragraphs: [
				"Следует отметить, что высокое качество позиционных исследований требует определения и уточнения распределения внутренних резервов и ресурсов. Наше дело не так однозначно, как может показаться: глубокий уровень погружения позволяет выполнить важные задания по разработке первоочередных требований. Противоположная точка зрения подразумевает, что тщательные исследования конкурентов набирают популярность среди определённых слоёв населения, а значит, должны быть своевременно верифицированы. А ещё представители современных социальных резервов в равной степени предоставлены сами себе. Но консультация с широким активом представляет собой интересный эксперимент проверки прогресса профессионального сообщества. Повседневная практика показывает, что высокотехнологичная концепция общественного уклада предполагает независимые способы реализации глубокомысленных рассуждений. Таким образом, перспективное планирование обеспечивает широкому кругу (специалистов) участие в формировании поэтапного и последовательного развития общества.",
			],
		},
	],
};

export function AboutPageInfo() {
	return (
		<div className="container block-bottom">
			<InfoBlock content={mockData.content} title={mockData.title} titlePage />
			<h1 className="page-title margin-bot"></h1>
			<div className={styles.banner}>
				<PlayIcon className={styles.play} isBadge />
				<div className={styles.banner__info}>
					<div className={styles.banner__top}>
						<span className={styles.banner__top_tag}>Видео</span>
						<span className={styles.banner__top_views}>815 просмотров</span>
					</div>
					<p className={styles.banner__text}>
						Обзор сервисного <br />
						центра PELETON
					</p>
				</div>
			</div>
		</div>
	);
}
