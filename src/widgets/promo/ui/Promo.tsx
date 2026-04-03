"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { actionsData } from "@/src/shared/data/actions/actions";
import { SwiperControls } from "@/src/shared/ui/swiperControls/SwiperControls";
import { PromoCard } from "@/src/widgets/promo/ui/PromoCard";

import styles from "./Promo.module.scss";

interface ActionsProps {
	idSection: string;
	titleSection: string;
}
export function Promo({ idSection, titleSection }: ActionsProps) {
	const navigation = {
		prevEl: "[data-promo-prev]",
		nextEl: "[data-promo-next]",
	};
	return (
		<section id={idSection} className={`${styles.actions} block-bottom`}>
			<div className="container">
				<h2 className="section-title">{titleSection}</h2>
				<div className={styles.actions__wrapper}>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={20}
						slidesPerView={3}
						navigation={navigation}
						pagination={{
							clickable: true,
							dynamicBullets: true,
							el: "[data-promo-pagination]",
						}}
						breakpoints={{
							320: {
								slidesPerView: 1,
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
						{actionsData.map((action) => (
							<SwiperSlide key={action.title} className={styles.actions__slide}>
								<PromoCard action={action} />
							</SwiperSlide>
						))}

						<SwiperControls
							prevButtonProps={{ "data-promo-prev": true }}
							nextButtonProps={{ "data-promo-next": true }}
							paginationProps={{ "data-promo-pagination": true }}
						/>
					</Swiper>
				</div>
			</div>
		</section>
	);
}
