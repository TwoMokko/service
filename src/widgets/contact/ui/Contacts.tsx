"use client";

import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { about } from "@/src/shared/config";
import { brandsTitlesData } from "@/src/shared/data/brands";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import ContactItem from "@/src/widgets/contact/ui/ContactItem";

import styles from "./Contacts.module.scss";

export function Contacts({
	idSection,
	titleSection,
	titlePage = false,
}: {
	idSection: string;
	titleSection: string;
	titlePage?: boolean;
}) {
	const { isMobile } = useDevice();
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const contactsData = [
		{
			id: "first",
			address: about.address,
			phone: about.phone,
			email: about.email,
			time: about.time,
			brands: brandsTitlesData.official44.slice(0, 8),
		},
		{
			id: "second",
			address: about.addressSecond,
			phone: about.phoneSecond,
			email: about.email,
			time: about.time,
			brands: brandsTitlesData.official33,
		},
	];

	const handleAddressClick = (index: number) => {
		if (swiperInstance) {
			swiperInstance.slideTo(index);
			setActiveIndex(index);
		}
	};

	const navigation = {
		prevEl: "[data-contacts-prev]",
		nextEl: "[data-contacts-next]",
	};

	const pagination = {
		el: "[data-contacts-pagination]",
		clickable: true,
	};

	return (
		<section id={idSection} className={`${styles.contacts} block-bottom`}>
			<div className="container">
				<h2
					className={`${styles.contactsTitle} ${titlePage ? "page-title" : "section-title"}`}
				>
					{titleSection}
				</h2>
				<div className={styles.contactsWrap}>
					<div className={styles.contactsNav}>
						<nav className={styles.contactsSwitcher}>
							{contactsData.map((contact, idx) => (
								<button
									key={contact.id}
									onClick={() => handleAddressClick(idx)}
									className={`${styles.contactsSwitcherBtn} ${activeIndex === idx ? styles.active : ""}`}
									aria-pressed={activeIndex === idx}
								>
									{idx === 0 ? about.address : about.addressSecond}
								</button>
							))}
						</nav>

						<div className={`${styles.arrowsNav} mob-hide`}>
							<button
								className={styles.arrowButton}
								data-contacts-prev
								aria-label="Предыдущий адрес"
							>
								<IoIosArrowBack size={20} />
							</button>
							<button
								className={styles.arrowButton}
								data-contacts-next
								aria-label="Следующий адрес"
							>
								<IoIosArrowForward size={20} />
							</button>
						</div>
					</div>

					<div
						className={`${styles.paginationWrapper} desk-hide`}
						data-contacts-pagination
					/>

					<div className={styles.contactsItemsContainer}>
						<Swiper
							modules={[Navigation, Pagination, EffectFade]}
							spaceBetween={0}
							slidesPerView={1}
							navigation={navigation}
							pagination={pagination}
							effect="fade"
							fadeEffect={{ crossFade: true }}
							speed={500}
							allowTouchMove={false}
							simulateTouch={false}
							onSwiper={setSwiperInstance}
							onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
							className={styles.contactsSwiper}
						>
							{contactsData.map((contact) => (
								<SwiperSlide key={contact.id}>
									<ContactItem
										address={contact.address}
										phone={contact.phone}
										email={contact.email}
										time={contact.time}
										isActive={true}
										brands={contact.brands}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}
