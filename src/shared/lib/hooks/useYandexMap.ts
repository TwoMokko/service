import { useEffect, useRef, useState } from "react";

import {
	mapControls,
	pinConfig,
	scrollLoadThreshold,
	yaMapConfig,
} from "@/src/shared/config/model-map";
import { UseYandexMapProps, UseYandexMapReturn } from "@/src/shared/types/types";

declare global {
	interface Window {
		ymaps?: any;
	}
}

export function useYandexMap({ address, isMobile }: UseYandexMapProps): UseYandexMapReturn {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [shouldLoadMap, setShouldLoadMap] = useState(false);
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);

	// Ленивая загрузка
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleScroll = () => {
			if (window.scrollY > scrollLoadThreshold) {
				setShouldLoadMap(true);
				window.removeEventListener("scroll", handleScroll);
			}
		};

		if (window.scrollY > scrollLoadThreshold) {
			setShouldLoadMap(true);
		} else {
			window.addEventListener("scroll", handleScroll);
		}

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// api
	useEffect(() => {
		if (!shouldLoadMap || isScriptLoaded) return;

		if (!yaMapConfig.apiKey) {
			setError("API ключ Яндекс.Карт не настроен");
			setIsLoading(false);
			return;
		}

		if (window.ymaps) {
			setIsScriptLoaded(true);
			return;
		}

		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = `https://api-maps.yandex.ru/2.1/?apikey=${yaMapConfig.apiKey}&lang=ru_RU`;
		script.async = true;

		script.onload = () => {
			setIsScriptLoaded(true);
		};

		script.onerror = () => {
			setError("Не удалось загрузить Яндекс.Карты API");
			setIsLoading(false);
		};

		document.body.appendChild(script);
	}, [shouldLoadMap, isScriptLoaded]);

	// Инициализация
	useEffect(() => {
		if (!isScriptLoaded || !mapRef.current || !window.ymaps) return;

		const initMap = async () => {
			try {
				await window.ymaps.ready();

				if (!mapRef.current) {
					throw new Error("Контейнер карты не найден");
				}

				const pinSettings = isMobile ? pinConfig.mobile : pinConfig.desktop;

				const map = new window.ymaps.Map(mapRef.current, {
					center: yaMapConfig.center,
					zoom: yaMapConfig.zoom,
				});

				mapInstanceRef.current = map;

				try {
					const geoResult = await window.ymaps.geocode(address);

					if (!geoResult || !geoResult.geoObjects) {
						throw new Error("Не удалось найти адрес");
					}

					const geoObject = geoResult.geoObjects.get(0);

					if (geoObject) {
						const coords = geoObject.geometry.getCoordinates();

						const placemark = new window.ymaps.Placemark(coords, null, {
							iconLayout: "default#image",
							iconImageHref: "/images/icons/pin.svg",
							iconImageSize: pinSettings.size,
							iconImageOffset: pinSettings.offset,
						});

						map.geoObjects.add(placemark);
						map.setCenter(coords);
					} else {
						console.warn("Геообъект не найден, используем координаты по умолчанию");
					}
				} catch (geocodeError) {
					console.error("Ошибка геокодирования:", geocodeError);
				}

				// Удаление основных элементов управления
				mapControls.forEach((control) => {
					try {
						map.controls.remove(control);
					} catch (controlError) {
						console.warn(`Не удалось удалить контрол ${control}`);
					}
				});

				setIsLoading(false);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Ошибка инициализации карты";
				console.error("Ошибка при инициализации карты:", err);
				setError(errorMessage);
				setIsLoading(false);
			}
		};

		initMap();

		return () => {
			if (mapInstanceRef.current) {
				try {
					mapInstanceRef.current.destroy();
				} catch (destroyError) {
					console.warn("Ошибка при удалении карты:", destroyError);
				}
				mapInstanceRef.current = null;
			}
		};
	}, [isScriptLoaded, address]);

	return { mapRef, isLoading, error };
}
