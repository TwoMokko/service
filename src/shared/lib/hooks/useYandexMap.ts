// useYandexMap.ts
import { useEffect, useRef, useState } from "react";

import { pinConfig, yaMapConfig } from "@/src/shared/config";
import { UseYandexMapProps, UseYandexMapReturn } from "@/src/shared/types/types";

declare global {
	interface Window {
		ymaps?: any;
		ymapsScriptLoaded?: boolean;
		ymapsLoadingPromise?: Promise<void>;
	}
}

export function useYandexMap({ address, isMobile }: UseYandexMapProps): UseYandexMapReturn {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Загрузка API (один раз для всех карт)
	useEffect(() => {
		if (typeof window === "undefined") return;

		const loadYandexAPI = (): Promise<void> => {
			// Если уже загружено
			if (window.ymaps && window.ymaps.ready) {
				return window.ymaps.ready();
			}

			// Если уже загружается
			if (window.ymapsLoadingPromise) {
				return window.ymapsLoadingPromise;
			}

			// Загружаем впервые
			window.ymapsLoadingPromise = new Promise((resolve, reject) => {
				const script = document.createElement("script");
				script.type = "text/javascript";
				script.src = `https://api-maps.yandex.ru/2.1/?apikey=${yaMapConfig.apiKey}&lang=ru_RU`;
				script.async = true;

				script.onload = () => {
					window.ymaps.ready(() => {
						window.ymapsScriptLoaded = true;
						resolve();
					});
				};

				script.onerror = () => {
					reject(new Error("Не удалось загрузить Яндекс.Карты API"));
				};

				document.body.appendChild(script);
			});

			return window.ymapsLoadingPromise;
		};

		loadYandexAPI()
			.then(() => {
				// API загружено, можно инициализировать карту
				if (mapRef.current) {
					initMap();
				}
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			});
	}, []); // Пустой массив - загружаем API один раз

	// Инициализация конкретной карты
	const initMap = async () => {
		if (!mapRef.current || !window.ymaps) return;

		try {
			await window.ymaps.ready();

			if (!mapRef.current) return;

			const pinSettings = isMobile ? pinConfig.mobile : pinConfig.desktop;

			// Временные координаты (обновятся после геокодирования)
			const map = new window.ymaps.Map(mapRef.current, {
				center: yaMapConfig.center,
				zoom: yaMapConfig.zoom,
				controls: [], // Убираем все контролы сразу
			});

			mapInstanceRef.current = map;

			// Геокодирование адреса
			try {
				const geoResult = await window.ymaps.geocode(address);
				const geoObject = geoResult?.geoObjects?.get(0);

				if (geoObject) {
					const coords = geoObject.geometry.getCoordinates();

					const placemark = new window.ymaps.Placemark(coords, null, {
						iconLayout: "default#image",
						iconImageHref: "/images/icons/pin.svg",
						iconImageSize: pinSettings.size,
						iconImageOffset: pinSettings.offset,
						hasBalloon: false, // Отключаем балун
						hasHint: false, // Отключаем подсказки
					});

					map.geoObjects.add(placemark);
					map.setCenter(coords);
				}
			} catch (geocodeError) {
				console.error("Ошибка геокодирования:", geocodeError);
			}

			setIsLoading(false);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Ошибка инициализации карты";
			setError(errorMessage);
			setIsLoading(false);
		}
	};

	// Очистка при размонтировании компонента
	useEffect(() => {
		return () => {
			if (mapInstanceRef.current) {
				try {
					mapInstanceRef.current.destroy();
				} catch (err) {
					console.warn("Ошибка при удалении карты:", err);
				}
			}
		};
	}, []);

	return { mapRef, isLoading, error };
}
