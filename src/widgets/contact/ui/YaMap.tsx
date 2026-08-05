"use client";

import { useEffect, useRef, useState } from "react";

import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { useYandexMap } from "@/src/shared/lib/hooks/useYandexMap";
import { YaMapProps } from "@/src/shared/types/types";

import styles from "./YaMap.module.scss";

export function YaMap({ address, className = "" }: YaMapProps) {
	const { isMobile } = useDevice();
	const [shouldLoadMap, setShouldLoadMap] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Загружаем карту когда секция становится видимой
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setShouldLoadMap(true);
					observer.disconnect();
				}
			},
			{
				threshold: 0.01,
				rootMargin: "100px",
			},
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		// Запасной вариант - если observer не сработал через 3 секунды
		// const timeout = setTimeout(() => {
		// 	setShouldLoadMap(true);
		// 	observer.disconnect();
		// }, 3000);

		return () => {
			observer.disconnect();
			// clearTimeout(timeout);
		};
	}, []);

	// вызываем useYandexMap ТОЛЬКО когда нужно загрузить карту
	const { mapRef, isLoading, error } = useYandexMap({
		address,
		isMobile,
		enabled: shouldLoadMap, // Добавляем флаг включения
	});

	if (error) {
		return (
			<div className={`${styles.mapError} ${className}`}>
				<p className={styles.errorTitle}>Не удалось загрузить карту</p>
				<p className={styles.errorMessage}>{error}</p>
			</div>
		);
	}

	return (
		<div
			ref={mapRef}
			className={`${styles.mapContainer} ${isLoading ? styles.loading : ""} ${className}`}
		>
			{isLoading && (
				<div className={styles.loadingOverlay}>
					<p className={styles.loadingText}>Загрузка карты...</p>
				</div>
			)}
		</div>
	);
}
