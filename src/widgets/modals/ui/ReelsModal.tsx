"use client";

import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { ReelsData } from "@/src/shared/types/types";

import styles from "./ReelsModal.module.scss";

export function ReelsModal() {
	const { closeModal, modalData } = useModal();
	const reelsData = modalData as ReelsData;
	const swiperRef = useRef<SwiperType | null>(null);
	const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
	const [activeVideoState, setActiveVideoState] = useState<{
		index: number;
		isPlaying: boolean;
	}>({ index: 0, isPlaying: true });

	const isValidData = reelsData?.videos?.length > 0;

	// Управление видео
	const manageVideoPlayback = useCallback((activeIndex?: number) => {
		videoRefs.current.forEach((video, index) => {
			if (!video) return;

			if (index === activeIndex) {
				video.muted = false;
				video.controls = false;

				const playPromise = video.play();
				if (playPromise !== undefined) {
					playPromise
						.then(() => {
							setActiveVideoState({ index: activeIndex, isPlaying: true });
						})
						.catch((error) => {
							if (error.name !== "AbortError") {
								console.warn("Video play failed:", error);
							}
						});
				}
			} else {
				video.pause();
				video.currentTime = 0;
				video.controls = false;
				video.muted = true;
			}
		});
	}, []);

	// Клик по видео для паузы/воспроизведения
	const handleVideoClick = (index: number) => {
		// Если это не активное видео, переключаемся на него
		if (swiperRef.current?.activeIndex !== index) {
			swiperRef.current?.slideTo(index);
			return;
		}

		// Если это активное видео - управляем воспроизведением
		const video = videoRefs.current.get(index);
		if (!video) return;

		if (video.paused) {
			video.play();
			setActiveVideoState({ index, isPlaying: true });
		} else {
			video.pause();
			setActiveVideoState({ index, isPlaying: false });
		}
	};

	// Обработчик клавиш
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!swiperRef.current) return;

			const activeVideo = videoRefs.current.get(swiperRef.current.activeIndex);

			switch (e.code) {
				case "Escape":
					closeModal();
					break;
				case "ArrowLeft":
					swiperRef.current.slidePrev();
					break;
				case "ArrowRight":
					swiperRef.current.slideNext();
					break;
				case "Space":
				case "Enter":
					e.preventDefault();
					if (activeVideo) {
						if (activeVideo.paused) {
							activeVideo.play();
							setActiveVideoState({
								index: swiperRef.current.activeIndex,
								isPlaying: true,
							});
						} else {
							activeVideo.pause();
							setActiveVideoState({
								index: swiperRef.current.activeIndex,
								isPlaying: false,
							});
						}
					}
					break;
			}
		},
		[closeModal],
	);

	useEffect(() => {
		if (!isValidData) {
			closeModal();
			return;
		}
	}, [isValidData, closeModal]);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => handleKeyDown(e);
		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("keydown", handleKey);
		};
	}, [handleKeyDown]);

	const handleSwiperInit = (swiper: SwiperType) => {
		swiperRef.current = swiper;

		setTimeout(() => {
			manageVideoPlayback(reelsData.initialIndex || 0);
			setActiveVideoState({
				index: reelsData.initialIndex || 0,
				isPlaying: true,
			});
		}, 100);
	};

	const handleVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
		if (el) {
			videoRefs.current.set(index, el);

			el.onended = () => {
				const isLastVideo = index === reelsData.videos.length - 1;

				if (isLastVideo) {
					closeModal();
				} else {
					swiperRef.current?.slideTo(index + 1);
				}
			};

			el.onplay = () => {
				if (index === swiperRef.current?.activeIndex) {
					setActiveVideoState({ index, isPlaying: true });
				}
			};

			el.onpause = () => {
				if (index === swiperRef.current?.activeIndex) {
					setActiveVideoState({ index, isPlaying: false });
				}
			};
		} else {
			videoRefs.current.delete(index);
		}
	};

	if (!isValidData) {
		return null;
	}

	return (
		<div className={styles.reelsModalOverlay} onClick={closeModal}>
			<button className={styles.closeButton} onClick={closeModal}>
				<MdOutlineClose />
			</button>

			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<Swiper
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={"auto"}
					spaceBetween={20}
					initialSlide={reelsData.initialIndex || 0}
					navigation={{
						nextEl: `.${styles.swiperButtonNext}`,
						prevEl: `.${styles.swiperButtonPrev}`,
					}}
					modules={[Navigation]}
					className={styles.videoSwiper}
					onTransitionEnd={(swiper) => {
						manageVideoPlayback(swiper.activeIndex);
						setActiveVideoState({
							index: swiper.activeIndex,
							isPlaying: true,
						});
					}}
					onSwiper={handleSwiperInit}
					slideToClickedSlide={true}
					centerInsufficientSlides={true}
					watchSlidesProgress={true}
				>
					{reelsData.videos.map((video, index) => (
						<SwiperSlide key={video.id} className={styles.videoSlide}>
							<div
								className={styles.videoContainer}
								onClick={() => handleVideoClick(index)}
							>
								<video
									ref={handleVideoRef(index)}
									src={video.url}
									muted
									preload="auto"
									playsInline
									controls={false}
									className={styles.videoElement}
								/>

								{activeVideoState.index === index &&
									!activeVideoState.isPlaying && (
										<div className={styles.play}>
											<FaPlay size={24} />
										</div>
									)}

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
											<div className={styles.videoSubtitle}>
												{video.subtitle}
											</div>
										)}
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<div className={styles.swiperButtonPrev}>
					<IoIosArrowBack />
				</div>
				<div className={styles.swiperButtonNext}>
					<IoIosArrowForward />
				</div>
			</div>
		</div>
	);
}
