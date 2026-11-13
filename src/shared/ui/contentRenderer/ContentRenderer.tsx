import Image from "next/image";

import { ContentBlock } from "@/src/shared/data/articles/types";

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
	return (
		<>
			{blocks.map((block, index) => {
				switch (block.type) {
					case "paragraph":
						return <p key={index}>{block.text}</p>;

					case "heading":
						return block.level === 2 ? (
							<h2 key={index}>{block.text}</h2>
						) : (
							<h3 key={index}>{block.text}</h3>
						);

					case "list": {
						const List = block.ordered ? "ol" : "ul";

						return (
							<List key={index}>
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
							/>
						);

					case "price":
						return (
							<div key={index}>
								{block.oldPrice && <del>{block.oldPrice} ₽</del>}
								<strong>{block.price} ₽</strong>
							</div>
						);
				}
			})}
		</>
	);
}
