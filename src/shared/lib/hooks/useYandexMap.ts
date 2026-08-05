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

export function useYandexMap({
	address,
	isMobile,
	enabled = true,
}: UseYandexMapProps & { enabled?: boolean }): UseYandexMapReturn {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [scriptLoaded, setScriptLoaded] = useState(false);

	// Загрузка скрипта только если enabled = true
	useEffect(() => {
		if (!enabled) {
			console.log("⏸️ Карта отключена, ждем включения...");
			return;
		}

		if (typeof window === "undefined") return;

		if (window.ymaps) {
			console.log("✅ Яндекс.Карты уже загружены");
			setScriptLoaded(true);
			setIsLoading(false);
			return;
		}

		console.log("📥 Загружаем скрипт Яндекс.Карт...");

		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = `https://api-maps.yandex.ru/2.1/?apikey=${yaMapConfig.apiKey}&lang=ru_RU`;
		script.async = true;

		script.onload = () => {
			console.log("✅ Скрипт загружен, ждем ready...");
			if (window.ymaps) {
				window.ymaps.ready(() => {
					console.log("✅ Яндекс.Карты готовы");
					setScriptLoaded(true);
					setIsLoading(false);
				});
			}
		};

		script.onerror = () => {
			console.error("❌ Ошибка загрузки Яндекс.Карт");
			setError("Не удалось загрузить карту");
			setIsLoading(false);
		};

		document.head.appendChild(script);

		return () => {
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
		};
	}, [enabled]); // 👈 Добавляем зависимость от enabled

	// Инициализация карты
	useEffect(() => {
		if (!enabled || !scriptLoaded || !window.ymaps || !mapRef.current) {
			return;
		}

		console.log("🗺️ Начинаем инициализацию карты");

		const initMap = async () => {
			try {
				await window.ymaps.ready();

				if (!mapRef.current) return;

				const pinSettings = isMobile ? pinConfig.mobile : pinConfig.desktop;

				const map = new window.ymaps.Map(mapRef.current, {
					center: yaMapConfig.center,
					zoom: yaMapConfig.zoom,
					controls: [],
				});

				console.log("✅ Карта создана");
				mapInstanceRef.current = map;

				// Геокодирование адреса
				try {
					console.log(`🔍 Ищем адрес: ${address}`);
					const geoResult = await window.ymaps.geocode(address);
					const geoObject = geoResult?.geoObjects?.get(0);

					if (geoObject) {
						const coords = geoObject.geometry.getCoordinates();
						console.log(`📍 Найдены координаты: ${coords}`);

						const placemark = new window.ymaps.Placemark(coords, null, {
							iconLayout: "default#image",
							iconImageHref: "/images/icons/pin.svg",
							iconImageSize: pinSettings.size,
							iconImageOffset: pinSettings.offset,
							hasBalloon: false,
							hasHint: false,
						});

						map.geoObjects.add(placemark);
						map.setCenter(coords, yaMapConfig.zoom, {
							checkZoomRange: true,
						});
					} else {
						console.warn("⚠️ Адрес не найден");
						// Используем координаты по умолчанию
						map.setCenter(yaMapConfig.center, yaMapConfig.zoom);
					}
				} catch (geocodeError) {
					console.error("Ошибка геокодирования:", geocodeError);
					// Используем координаты по умолчанию
					map.setCenter(yaMapConfig.center, yaMapConfig.zoom);
				}

				setIsLoading(false);
			} catch (err) {
				console.error("Ошибка инициализации карты:", err);
				const errorMessage =
					err instanceof Error ? err.message : "Ошибка инициализации карты";
				setError(errorMessage);
				setIsLoading(false);
			}
		};

		initMap();

		return () => {
			if (mapInstanceRef.current) {
				try {
					mapInstanceRef.current.destroy();
					console.log("🗑️ Карта уничтожена");
				} catch (err) {
					console.warn("Ошибка при удалении карты:", err);
				}
			}
		};
	}, [enabled, scriptLoaded, address, isMobile]); // 👈 Добавляем enabled

	return { mapRef, isLoading, error };
}
