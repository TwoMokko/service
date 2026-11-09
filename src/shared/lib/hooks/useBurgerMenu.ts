import { useEffect, useRef, useState } from "react";

export function useBurgerMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		document.body.classList.toggle("lock", isOpen);

		return () => {
			document.body.classList.remove("lock");
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target instanceof Node)) return;

			if (
				!menuRef.current?.contains(event.target) &&
				!buttonRef.current?.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("pointerdown", handleClickOutside);

		return () => {
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, [isOpen]);

	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	return {
		isOpen,
		menuRef,
		buttonRef,
		toggle,
		close,
	};
}
