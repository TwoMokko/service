"use client";

import React from "react";

import styles from "./Marquee.module.scss";

interface MarqueeProps {
	text: string[];
	speed?: number;
	pauseOnHover?: boolean;
	direction?: "left" | "right";
}

const Marquee = ({ text, speed = 50, pauseOnHover = true, direction = "left" }: MarqueeProps) => {
	return (
		<div className={`${styles.marqueeContainer} ${pauseOnHover ? styles.pauseOnHover : ""}`}>
			<div
				className={styles.marqueeContent}
				style={{
					animationDuration: `${speed}s`,
				}}
			>
				{/* Контент + дубликат */}
				{[...text, ...text, ...text].map((line, index) => (
					<div key={index} className={styles.marqueeItem}>
						{line}
					</div>
				))}
			</div>
		</div>
	);
};

export default Marquee;
