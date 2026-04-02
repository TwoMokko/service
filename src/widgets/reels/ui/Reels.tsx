"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import { FaPlay } from "react-icons/fa";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { modelReels } from "@/src/shared/config";
import { ReelsItem } from "@/src/shared/types/types";
import { SwiperControls } from "@/src/shared/ui/swiperControls/SwiperControls";

import styles from "./Reels.module.scss";

export function Reels(): React.ReactNode {
	const { openModal } = useModal();
	const videos: ReelsItem[] = modelReels;

	const navigation = {
		prevEl: "[data-reels-prev]",
		nextEl: "[data-reels-next]",
	};

	const handleVideoClick = (index: number) => {
		openModal("video", {
			videos: videos,
			initialIndex: index,
		});
	};

	return (
		<section className={`${styles.reels} container`}>
			<div className={styles.reelsSwiperWrap}>
				<Swiper
					modules={[Navigation, Pagination]}
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
							slidesPerView: 4,
						},
					}}
					navigation={navigation}
					pagination={{
						clickable: true,
						dynamicBullets: true,
						el: "[data-reels-pagination]",
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
											alt={video.title ?? ""}
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
					<SwiperControls
						prevButtonProps={{ "data-reels-prev": true }}
						nextButtonProps={{ "data-reels-next": true }}
						paginationProps={{ "data-reels-pagination": true }}
					/>
				</Swiper>
			</div>
		</section>
	);
}
