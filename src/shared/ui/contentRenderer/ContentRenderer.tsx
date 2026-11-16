import Image from "next/image";

import { ContentBlock } from "@/src/shared/data/articles/types";

import styles from "./ContentRenderer.module.scss";

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
	return (
		<>
			{blocks.map((block, index) => {
				switch (block.type) {
					case "paragraph":
						return (
							<p className={styles.paragraph} key={index}>
								{block.text}
							</p>
						);

					case "heading":
						return block.level === 2 ? (
							<h2 className={styles.heading} key={index}>
								{block.text}
							</h2>
						) : (
							<h3 className={styles.heading} key={index}>
								{block.text}
							</h3>
						);

					case "list": {
						const List = block.ordered ? "ol" : "ul";
						const classes = block.ordered
							? styles.list
							: `${styles.list} ${styles.ordered}`;

						return (
							<List className={classes} key={index}>
								{block.items.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</List>
						);
					}

					case "image":
						return (
							<Image
								key={index}
								src={block.src}
								alt={block.alt}
								width={800}
								height={500}
								className={styles.image}
							/>
						);

					case "price":
						return (
							<div className={styles.price} key={index}>
								{block.oldPrice && <del>{block.oldPrice} ₽</del>}
								<strong>{block.price} ₽</strong>
							</div>
						);
				}
			})}
		</>
	);
}
