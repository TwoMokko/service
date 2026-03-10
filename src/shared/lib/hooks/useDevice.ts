import { useEffect, useState } from "react";

export function useDevice() {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isLaptop, setIsLaptop] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const checkDevice = () => {
			const width = window.innerWidth;
			setIsMobile(width <= 768);
			setIsTablet(width > 768 && width <= 1024);
			setIsLaptop(width > 1024 && width <= 1800);
			setIsDesktop(width > 1800);
			setIsReady(true);
		};

		checkDevice();
		window.addEventListener("resize", checkDevice);

		return () => window.removeEventListener("resize", checkDevice);
	}, []);

	return { isMobile, isTablet, isLaptop, isDesktop, isReady };
}
