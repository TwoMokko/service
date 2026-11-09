"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { reels } from "@/src/shared/data/reels/reels";
import { ReelsItem } from "@/src/shared/types/types";
import { PlayIcon } from "@/src/shared/ui/playIcon/PlayIcon";
import { SwiperControls } from "@/src/shared/ui/swiperControls/SwiperControls";

import styles from "./Reels.module.scss";

export function Reels(): React.ReactNode {
	const { openModal } = useModal();
	const videos: ReelsItem[] = reels;

	const navigation = {
		prevEl: "[data-reels-prev]",
		nextEl: "[data-reels-next]",
	};

	const handleVideoClick = (index: number) => {
		openModal("reels", {
			videos: videos,
			initialIndex: index,
		});
	};

	return (
		<section className={`${styles.reels} container`}>
			<h2 className="section-title margin-bot">Видео-рилс из соцсетей</h2>
			<div className={styles.reelsSwiperWrap}>
				<Swiper
					modules={[Navigation, Pagination]}
					slidesPerView={"auto"}
					spaceBetween={0}
					loop={false}
					breakpoints={{
						640: {
							slidesPerView: 1,
							spaceBetween: 0,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 10,
						},
						1280: {
							slidesPerView: 4,
							spaceBetween: 10,
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
							<PlayIcon className={styles.play} />
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
