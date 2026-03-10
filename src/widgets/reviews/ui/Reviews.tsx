"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";

import { useMemo } from "react";
import type { ReactElement } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdStar } from "react-icons/io";

import Image from "next/image";
import Link from "next/link";

import { reviewsDesktopSlides, reviewsMobileSlides } from "@/src/shared/config";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import type {
	ReviewDesktopSlide,
	ReviewMobileSlide,
	ReviewPhotoCard,
	ReviewTextCard,
} from "@/src/shared/types/types";

import styles from "./Reviews.module.scss";

interface ReviewsProps {
	idSection: string;
	titleSection: string;
}

const isPhotoCard = (card: ReviewPhotoCard | ReviewTextCard): card is ReviewPhotoCard =>
	card.type === "photo";

type ReviewTextLayout = "single" | "top" | "bottom";

interface ReviewsSwiperDesktopProps {
	variant: "desktop";
	slides: ReviewDesktopSlide[];
}

interface ReviewsSwiperMobileProps {
	variant: "mobile";
	slides: ReviewMobileSlide[];
}

type ReviewsSwiperProps = ReviewsSwiperDesktopProps | ReviewsSwiperMobileProps;

interface ReviewCardProps {
	card: ReviewPhotoCard | ReviewTextCard;
	layout?: ReviewTextLayout;
}

interface ReviewHeaderProps {
	card: ReviewPhotoCard | ReviewTextCard;
	variant: "photo" | "text";
}

interface ReviewsControlsProps {
	prevClass: string;
	nextClass: string;
}

function ReviewHeader({ card, variant }: ReviewHeaderProps) {
	const headerClass =
		variant === "photo" ? styles.reviews__cardHeader : styles.reviews__partHeader;

	return (
		<div className={headerClass}>
			{card.author.avatarSrc && (
				<Image
					src={card.author.avatarSrc}
					alt={card.author.name}
					width={64}
					height={64}
					className={styles.reviews__avatar}
				/>
			)}
			<div className={styles.reviews__headerInfo}>
				<p className={styles.reviews__headerInfoName}>{card.author.name}</p>
				<div className={styles.reviews__headerInfoMeta}>
					<div
						className={styles.reviews__headerInfoMetaRating}
						aria-label="Рейтинг"
						role="img"
					>
						{Array.from({ length: 5 }).map((_, index) => (
							<IoMdStar key={index} aria-hidden="true" />
						))}
					</div>
					<p className={styles.reviews__headerInfoMetaDate}>{card.author.date}</p>
				</div>
			</div>
		</div>
	);
}

function ReviewCard({ card, layout = "single" }: ReviewCardProps) {
	if (isPhotoCard(card)) {
		return (
			<div className={styles.reviews__card}>
				<ReviewHeader card={card} variant="photo" />
				<div className={styles.reviews__cardImage}>
					<Image
						src={card.photoSrc}
						alt={`Фото клиента ${card.author.name}`}
						width={486}
						height={364}
					/>
				</div>
			</div>
		);
	}

	const classNames = [styles.reviews__part];

	if (layout === "top") {
		classNames.push(styles.reviews__partTop);
	} else if (layout === "bottom") {
		classNames.push(styles.reviews__partBottom);
	}

	return (
		<div className={classNames.join(" ")}>
			<div className={styles.reviews__partContent}>
				<ReviewHeader card={card} variant="text" />
				<p className={styles.reviews__text}>{card.text}</p>
			</div>
			<Link
				href={card.link}
				target="_blank"
				rel="noopener noreferrer"
				className={styles.reviews__partLink}
			>
				Перейти в Я.Карты
			</Link>
		</div>
	);
}

function ReviewsControls({ prevClass, nextClass }: ReviewsControlsProps) {
	return (
		<div className={styles.reviews__controls}>
			<button type="button" className={prevClass} aria-label="Предыдущий отзыв">
				<IoIosArrowBack size={20} color="black" />
			</button>
			<button type="button" className={nextClass} aria-label="Следующий отзыв">
				<IoIosArrowForward size={20} color="black" />
			</button>
		</div>
	);
}

function ReviewsSwiper(props: ReviewsSwiperProps) {
	const isDesktop = props.variant === "desktop";

	const modules = isDesktop ? [Navigation] : [Navigation, Pagination];

	const navigation = isDesktop
		? {
				prevEl: `.${styles.reviews__buttonPrev}`,
				nextEl: `.${styles.reviews__buttonNext}`,
			}
		: {
				prevEl: `.${styles.reviews__buttonMobPrev}`,
				nextEl: `.${styles.reviews__buttonMobNext}`,
			};

	const swiperProps: SwiperProps = {
		modules,
		slidesPerView: "auto",
		spaceBetween: isDesktop ? 20 : 8,
		initialSlide: isDesktop ? 2 : 0,
		loop: true,
		loopAdditionalSlides: 1,
		centeredSlides: false,
		navigation,
		...(isDesktop
			? {
					breakpoints: {
						0: {
							centeredSlides: false,
							slidesOffsetBefore: 150,
						},
						1601: {
							centeredSlides: false,
							slidesOffsetBefore: 140,
						},
					},
				}
			: {
					pagination: {
						el: `.${styles.reviews__pagination}`,
						clickable: true,
					},
				}),
	};

	return (
		<div className="container">
			<Swiper
				key={props.variant}
				{...swiperProps}
				className={isDesktop ? styles.reviews__swiperDesktop : styles.reviews__swiperMobile}
			>
				{isDesktop
					? props.slides.map((slide) => (
							<SwiperSlide
								key={slide.id}
								className={`${styles.reviews__slide} ${
									slide.type === "double" ? styles.reviews__slideDouble : ""
								}`}
							>
								{slide.type === "double" ? (
									slide.items.map((item, index) => (
										<ReviewCard
											key={item.id}
											card={item}
											layout={index === 0 ? "top" : "bottom"}
										/>
									))
								) : (
									<ReviewCard card={slide} />
								)}
							</SwiperSlide>
						))
					: props.slides.map((slide) => (
							<SwiperSlide
								key={slide.id}
								className={`${styles.reviews__mobileSlide} ${
									slide.type === "text" ? styles.reviews__mobileSlideText : ""
								}`}
							>
								<ReviewCard card={slide} />
							</SwiperSlide>
						))}
			</Swiper>

			{isDesktop ? (
				<ReviewsControls
					prevClass={styles.reviews__buttonPrev}
					nextClass={styles.reviews__buttonNext}
				/>
			) : (
				<div className={styles.reviews__paginationMobile}>
					<ReviewsControls
						prevClass={styles.reviews__buttonMobPrev}
						nextClass={styles.reviews__buttonMobNext}
					/>
					<div className={styles.reviews__pagination} />
				</div>
			)}
		</div>
	);
}

export function Reviews({ idSection, titleSection }: ReviewsProps) {
	const { isMobile, isReady } = useDevice();

	const swiper = useMemo<ReactElement>(() => {
		if (isReady && isMobile) {
			return <ReviewsSwiper variant="mobile" slides={reviewsMobileSlides} />;
		}

		return <ReviewsSwiper variant="desktop" slides={reviewsDesktopSlides} />;
	}, [isMobile, isReady]);

	return (
		<section id={idSection} className={`${styles.reviews} block-bottom`}>
			<div className="container">
				<h2 className="section-title">{titleSection}</h2>
			</div>

			<div className={styles.reviews__wrapper}>{swiper}</div>
		</section>
	);
}
