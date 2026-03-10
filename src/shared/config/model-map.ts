import { PinConfig, YaMapConfig } from "@/src/shared/types/types";

const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

export const yaMapConfig: YaMapConfig = {
	center: [55.628937, 37.469853],
	zoom: 18,
	address: "МКАД, 44-й километр, 1Вс2",
	apiKey: apiKey || "",
};

export const pinConfig = {
	desktop: {
		size: [51, 51],
		offset: [-25, -50],
	} as PinConfig,
	mobile: {
		size: [36, 36],
		offset: [-15, -30],
	} as PinConfig,
};

export const mapControls = [
	"searchControl",
	"trafficControl",
	"typeSelector",
	"rulerControl",
	"fullscreenControl",
	"zoomControl",
	"geolocationControl",
] as const;

export const scrollLoadThreshold = 500;
