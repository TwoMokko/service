import { useCallback, useEffect, useRef, useState } from "react";

export function useServicesMenu(delay = 200) {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLLIElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleMouseEnter = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsOpen(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		timeoutRef.current = setTimeout(() => {
			if (!menuRef.current?.matches(":hover") && !triggerRef.current?.matches(":hover")) {
				setIsOpen(false);
			}
		}, delay);
	}, [delay]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return {
		isOpen,
		triggerRef,
		menuRef,
		triggerHandlers: {
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
		},
		menuHandlers: {
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
		},
	};
}
