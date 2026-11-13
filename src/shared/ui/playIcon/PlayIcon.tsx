import React from "react";
import { IoMdPlayCircle } from "react-icons/io";

import styles from "./PlayIcon.module.scss";

export function PlayIcon({
	className = "",
	sizeIcon = 70,
	isBadge = false,
}: {
	className?: string;
	sizeIcon?: number;
	isBadge?: boolean;
}) {
	return (
		<div className={`${styles.play} ${className}`}>
			<IoMdPlayCircle size={sizeIcon} />

			{isBadge && (
				<div className={styles.badge}>
					Узнайте больше
					<br />о салоне <span>за 42 сек</span>
				</div>
			)}
		</div>
	);
}
