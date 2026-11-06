import React from "react";
import { IoMdPlay, IoMdPlayCircle } from "react-icons/io";

import styles from "./PlayIcon.module.scss";

export function PlayIcon({
	className = "",
	sizeIcon = 70,
}: {
	className?: string;
	sizeIcon?: number;
}) {
	return (
		<div className={`${styles.play} ${className}`}>
			<IoMdPlayCircle size={sizeIcon} />

			<div className={styles.badge}>
				Узнайте больше
				<br />о салоне <span>за 42 сек</span>
			</div>
		</div>
	);
}
