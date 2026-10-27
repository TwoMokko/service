import { useEffect, useRef, useState } from "react";

import { pinConfig, yaMapConfig } from "@/src/shared/config";
import { UseYandexMapProps, UseYandexMapReturn } from "@/src/shared/types/types";

declare global {
	interface Window {
		ymaps?: any;
		ymapsLoadingPromise?: Promise<void>;
	}
}

export function useYandexMap({
	address,
	isMobile,
	enabled = true,
}: UseYandexMapProps & { enabled?: boolean }): UseYandexMapReturn {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);
	const placemarkRef = useRef<any>(null);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [mapReady, setMapReady] = useState(false); // 👈 новое

	// ─── 1. Загрузка скрипта (глобально, один раз) ───
	useEffect(() => {
		if (!enabled || typeof window === "undefined") return;

		if (window.ymaps) {
			setScriptLoaded(true);
			return;
		}

		if (!window.ymapsLoadingPromise) {
			window.ymapsLoadingPromise = new Promise<void>((resolve, reject) => {
				const script = document.createElement("script");
				script.src = `https://api-maps.yandex.ru/2.1/?apikey=${yaMapConfig.apiKey}&lang=ru_RU`;
				script.async = true;
				script.onload = () => window.ymaps?.ready(() => resolve());
				script.onerror = () => reject(new Error("Не удалось загрузить Яндекс.Карты"));
				document.head.appendChild(script);
			});
		}

		window.ymapsLoadingPromise
			.then(() => setScriptLoaded(true))
			.catch(() => {
				setError("Не удалось загрузить карту");
				setIsLoading(false);
			});
	}, [enabled]);

	// ─── 2. Инициализация карты (один раз) ───
	useEffect(() => {
		if (!enabled || !scriptLoaded || !window.ymaps || !mapRef.current) return;

		let cancelled = false;

		const initMap = async () => {
			try {
				await window.ymaps.ready();
				if (cancelled || !mapRef.current) return;

				mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
					center: yaMapConfig.center,
					zoom: yaMapConfig.zoom,
					controls: [],
				});
				setMapReady(true); // 👈 карта готова
			} catch (err) {
				if (cancelled) return;
				setError(err instanceof Error ? err.message : "Ошибка инициализации карты");
				setIsLoading(false);
			}
		};

		initMap();

		return () => {
			cancelled = true;
			setMapReady(false); // 👈 сброс
			if (mapInstanceRef.current) {
				try {
					mapInstanceRef.current.destroy();
				} catch (err) {
					console.warn("Ошибка при удалении карты:", err);
				}
				mapInstanceRef.current = null;
				placemarkRef.current = null;
			}
		};
	}, [enabled, scriptLoaded]);

	// ─── 3. Обновление адреса (центр + placemark) ───
	useEffect(() => {
		const map = mapInstanceRef.current;
		if (!enabled || !scriptLoaded || !mapReady || !map || !window.ymaps) return;

		let cancelled = false;

		const updateAddress = async () => {
			try {
				const pinSettings = isMobile ? pinConfig.mobile : pinConfig.desktop;

				const geoResult = await window.ymaps.geocode(address);
				if (cancelled) return;

				const geoObject = geoResult?.geoObjects?.get(0);

				if (placemarkRef.current) {
					map.geoObjects.remove(placemarkRef.current);
					placemarkRef.current = null;
				}

				if (!geoObject) {
					if (cancelled) return;
					map.setCenter(yaMapConfig.center, yaMapConfig.zoom);
					setIsLoading(false);
					return;
				}

				const coords = geoObject.geometry.getCoordinates();

				const placemark = new window.ymaps.Placemark(coords, null, {
					iconLayout: "default#image",
					iconImageHref: "/images/icons/pin.svg",
					iconImageSize: pinSettings.size,
					iconImageOffset: pinSettings.offset,
					hasBalloon: false,
					hasHint: false,
				});
				placemarkRef.current = placemark;

				map.geoObjects.add(placemark);
				map.setCenter(coords, yaMapConfig.zoom, { checkZoomRange: true });
				setIsLoading(false);
			} catch (err) {
				if (cancelled) return;
				console.error("Ошибка геокодирования:", err);
				map.setCenter(yaMapConfig.center, yaMapConfig.zoom);
				setIsLoading(false);
			}
		};

		setIsLoading(true);
		updateAddress();

		return () => {
			cancelled = true;
		};
	}, [address, enabled, scriptLoaded, mapReady, isMobile]); // 👈 mapReady

	return { mapRef, isLoading, error };
}
