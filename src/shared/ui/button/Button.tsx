"use client";

import { FiArrowRight } from "react-icons/fi";

import styles from "./Button.module.scss";

interface ButtonProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "outline";
	withArrow?: boolean;
	minWidth?: number | string;
	type?: "button" | "submit" | "reset" | undefined;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

export function Button({
	children,
	variant = "primary",
	withArrow = false,
	minWidth,
	type = "button",
	disabled = false,
	onClick,
	className,
}: ButtonProps) {
	const buttonClass = `${styles.btn} ${styles[`${variant}`]} ${
		withArrow ? styles.btnArrowWrap : ""
	} ${className}`;

	return (
		<button
			type={type}
			className={buttonClass}
			data-min-width={minWidth}
			disabled={disabled}
			onClick={onClick}
		>
			{withArrow ? (
				<span className={styles.btnArrowIcons}>
					<FiArrowRight className={styles.arrowLeft} />
					{children}
					<FiArrowRight className={styles.arrowRight} />
				</span>
			) : (
				children
			)}
		</button>
	);
}
