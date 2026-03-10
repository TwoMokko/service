"use client";

import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { useYandexMap } from "@/src/shared/lib/hooks/useYandexMap";
import { YaMapProps } from "@/src/shared/types/types";

import styles from "./YaMap.module.scss";

export function YaMap({ address, className = "" }: YaMapProps) {
	const { isMobile } = useDevice();
	const { mapRef, isLoading, error } = useYandexMap({ address, isMobile });

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
			id="map"
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
