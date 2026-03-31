"use client";
import React, { useEffect, useState } from "react";

import styles from "@/src/widgets/contact/ui/YaMap.module.scss";

interface YaMapIframeProps {
	address: string;
	width?: string;
	height?: string;
	className?: string;
	zoom?: number; // Добавляем возможность менять зум
	showOnMobile?: boolean; // Показывать на мобильных или нет
}

export function YaMapIframe({
	address,
	width = "100%",
	height = "400px",
	className = "",
	zoom = 16,
	showOnMobile = true,
}: YaMapIframeProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Если на мобильном устройстве и карту нужно скрыть
	if (isMobile && !showOnMobile) {
		return null;
	}

	const encodedAddress = encodeURIComponent(address);
	const src = `https://yandex.ru/map-widget/v1/?text=${encodedAddress}&z=${zoom}&lang=ru_RU`;

	return (
		<div className={`${styles.mapContainer} ${isLoading ? styles.loading : ""} ${className}`}>
			{isLoading && (
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "#f5f5f5",
						borderRadius: "8px",
						zIndex: 1,
					}}
				>
					<span>Загрузка карты...</span>
				</div>
			)}
			<iframe
				id={`map-${address.replace(/\s/g, "-")}`} // Уникальный ID для каждой карты
				src={src}
				width={width}
				height={height}
				frameBorder="0"
				style={{
					border: 0,
					borderRadius: "8px",
					opacity: isLoading ? 0 : 1,
					transition: "opacity 0.3s ease",
				}}
				allowFullScreen
				loading="lazy"
				title={`Карта: ${address}`}
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	);
}
