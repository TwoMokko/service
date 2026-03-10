"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { modelReels } from "@/src/shared/config";
import { ReelsItem } from "@/src/shared/types/types";

import styles from "./Reels.module.scss";

export function Reels(): React.ReactNode {
	const { openModal } = useModal();
	const videos: ReelsItem[] = modelReels;
	const prevRef = useRef<HTMLDivElement>(null);
	const nextRef = useRef<HTMLDivElement>(null);

	const handleVideoClick = (index: number) => {
		openModal("video", {
			videos: videos,
			initialIndex: index,
		});
	};

	return (
		<section className={`${styles.reels} container`}>
			<div className={styles.reelsSwiperWrap}>
				<div ref={prevRef} className={styles.swiperButtonPrev}>
					<IoIosArrowBack size={24} />
				</div>
				<Swiper
					modules={[Navigation]}
					slidesPerView={"auto"}
					spaceBetween={10}
					loop={false}
					breakpoints={{
						640: {
							slidesPerView: 2,
						},
						768: {
							slidesPerView: 3,
						},
						1024: {
							slidesPerView: 4,
						},
						1280: {
							slidesPerView: 5,
						},
					}}
					navigation={{
						nextEl: nextRef.current,
						prevEl: prevRef.current,
					}}
					onSwiper={(swiper) => {
						setTimeout(() => {
							if (swiper.params.navigation) {
								// @ts-ignore
								swiper.params.navigation.prevEl = prevRef.current;
								// @ts-ignore
								swiper.params.navigation.nextEl = nextRef.current;
							}
							swiper.navigation.init();
							swiper.navigation.update();
						});
					}}
					className={styles.reelsSwiper}
				>
					{videos.map((video, index) => (
						<SwiperSlide
							key={video.id}
							className={styles.videoItem}
							onClick={() => handleVideoClick(index)}
						>
							<video
								className={styles.video}
								src={video.url}
								muted
								preload="metadata"
							/>
							<div className={styles.videoInfo}>
								{video.icon && (
									<div className={styles.videoIconWrap}>
										<Image
											src={video.icon}
											alt={video.title ?? "icon"}
											width={30}
											height={30}
											className={styles.videoIcon}
										/>
									</div>
								)}
								<div className={styles.videoText}>
									{video.title && (
										<div className={styles.videoTitle}>{video.title}</div>
									)}
									{video.subtitle && (
										<div className={styles.videoSubtitle}>{video.subtitle}</div>
									)}
								</div>
							</div>
							<div className={styles.play}>
								<FaPlay size={24} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<div ref={nextRef} className={styles.swiperButtonNext}>
					<IoIosArrowForward size={24} />
				</div>
			</div>
		</section>
	);
}
