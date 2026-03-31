"use client";

import {Navigation, Pagination} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { actionsData } from "@/src/shared/data/actions/actions";
import { ActionCard } from "@/src/widgets/actions/ui/ActionCard";

import styles from "./Actions.module.scss";
import {SwiperControls} from "@/src/shared/ui/swiperControls/SwiperControls";

interface ActionsProps {
	idSection: string;
	titleSection: string;
}
export function Actions({ idSection, titleSection }: ActionsProps) {
	const navigation = {
		prevEl: '[data-actions-prev]',
		nextEl: '[data-actions-next]'
	}
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
							el: '[data-actions-pagination]',
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
						className={styles.actionsSwiper}
					>
						{
							actionsData.map((action) => (
								<SwiperSlide key={action.title} className={styles.actions__slide}>
									<ActionCard action={action} />
								</SwiperSlide>
							))
						}

						<SwiperControls
							prevButtonProps={{ 'data-actions-prev': true }}
							nextButtonProps={{ 'data-actions-next': true }}
							paginationProps={{ 'data-actions-pagination': true }}
						/>
					</Swiper>
				</div>
			</div>
		</section>
	);
}
