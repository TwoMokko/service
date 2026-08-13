"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";

import { promoData } from "@/src/shared/data/promo/promo";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { SectionId } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";
import { SwiperControls } from "@/src/shared/ui/swiperControls/SwiperControls";
import { PromoCard } from "@/src/widgets/promo/ui/PromoCard";

import styles from "./PromoSwiper.module.scss";

interface PromoSwiperProps {
	idSection: string;
	titleSection: string;
}
export function PromoSwiper({ idSection, titleSection }: PromoSwiperProps) {
	const { isMobile } = useDevice();
	const navigation = {
		prevEl: "[data-promo-prev]",
		nextEl: "[data-promo-next]",
	};
	return (
		<section id={idSection} className={`${styles.promo} block-bottom`}>
			<div className="container">
				<div className={styles.top}>
					<h2 className="section-title">{titleSection}</h2>
					{!isMobile && (
						<Link prefetch={false} href={`/${SectionId.PROMO}`}>
							<Button variant="secondary">Смотреть все акции</Button>
						</Link>
					)}
				</div>
				<div className={`${styles.promo__wrapper} mob-hide`}>
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
						{promoData.map((promo) => (
							<SwiperSlide key={promo.id} className={styles.promo__slide}>
								<PromoCard promo={promo} />
							</SwiperSlide>
						))}

						<SwiperControls
							prevButtonProps={{ "data-promo-prev": true }}
							nextButtonProps={{ "data-promo-next": true }}
							paginationProps={{ "data-promo-pagination": true }}
						/>
					</Swiper>
				</div>
				<div className={`${styles.promo__wrapper} desk-hide`}>
					{promoData.slice(0, 3).map((promo) => (
						<PromoCard key={promo.id} promo={promo} />
					))}
				</div>

				{isMobile && (
					<Link prefetch={false} href={`/${SectionId.PROMO}`}>
						<Button variant="secondary">Смотреть все акции</Button>
					</Link>
				)}
			</div>
		</section>
	);
}
