"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArticleWithService } from "@/src/shared/data/articles";
import { SwiperControls } from "@/src/shared/ui/swiperControls/SwiperControls";

import { ArticleCard } from "./ArticleCard";

import styles from "./ArticleSwiper.module.scss";

export function ArticleSwiper({ articles }: { articles: ArticleWithService[] }) {
	const navigation = {
		prevEl: "[data-article-prev]",
		nextEl: "[data-article-next]",
	};

	if (!articles.length) return <section className="block-bottom container">нет похожих</section>;

	return (
		<section className={` block-bottom ${styles.articles}`}>
			<div className="container">
				<h2 className="section-title margin-bot">Похожие статьи</h2>
				<div className={styles.wrapper}>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={20}
						slidesPerView={3}
						navigation={navigation}
						pagination={{
							clickable: true,
							dynamicBullets: true,
							el: "[data-article-pagination]",
						}}
						breakpoints={{
							320: {
								slidesPerView: 1.2,
								spaceBetween: 15,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 20,
							},
						}}
						loop={false}
						className={styles.swiper}
					>
						{articles.map((article) => (
							<SwiperSlide key={article.slug} className={styles.slide}>
								<ArticleCard article={article} />
							</SwiperSlide>
						))}

						<SwiperControls
							prevButtonProps={{ "data-article-prev": true }}
							nextButtonProps={{ "data-article-next": true }}
							paginationProps={{ "data-article-pagination": true }}
						/>
					</Swiper>
				</div>
			</div>
		</section>
	);
}
