import { useCallback, useRef, useState } from "react";

export function useServicesMenu(delay = 200) {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLLIElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	// @ts-ignore
	const timeoutRef = useRef<NodeJS.Timeout>();

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
