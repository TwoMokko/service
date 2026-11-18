import type { Service } from "@/src/shared/data/services/types";

import styles from "../../admin.module.scss";

interface ServiceEditorProps {
	service: Service;
	onUpdate: (slug: string, changes: Partial<Service>) => void;
	onDelete: (slug: string) => void;
	slugDraft: string;
	onSlugDraftChange: (value: string) => void;
	onRename: (slug: string) => void;
}

export default function ServiceEditor({
	service,
	onUpdate,
	onDelete,
	slugDraft,
	onSlugDraftChange,
	onRename,
}: ServiceEditorProps) {
	const serviceSlug = service.slug;

	const handleItemUpdate = (index: number, changes: Partial<(typeof service.items)[number]>) => {
		const items = service.items.map((item, i) =>
			i === index ? { ...item, ...changes } : item,
		);

		onUpdate(serviceSlug, { items });
	};

	const handleItemDelete = (index: number) => {
		onUpdate(serviceSlug, {
			items: service.items.filter((_, i) => i !== index),
		});
	};

	const handleItemAdd = () => {
		onUpdate(serviceSlug, {
			items: [...service.items, { title: "", price: 0 }],
		});
	};

	return (
		<div className={styles.serviceCard}>
			<div className={styles.serviceHeader}>
				<input
					value={service.title}
					onChange={(event) =>
						onUpdate(serviceSlug, {
							title: event.target.value,
						})
					}
					className={`${styles.input} ${styles.serviceTitle}`}
					placeholder="Название услуги"
				/>

				<span>{serviceSlug}</span>

				<button
					type="button"
					className={styles.btnDelete}
					onClick={() => onDelete(serviceSlug)}
				>
					✕
				</button>
			</div>

			<div className={styles.slugWrap}>
				<label className={styles.label}>Slug услуги</label>

				<input
					className={styles.input}
					value={slugDraft}
					onChange={(event) => onSlugDraftChange(event.target.value)}
				/>

				<button type="button" className={styles.btn} onClick={() => onRename(serviceSlug)}>
					Изменить slug
				</button>
			</div>

			<input
				value={service.shortDescription}
				onChange={(event) =>
					onUpdate(serviceSlug, {
						shortDescription: event.target.value,
					})
				}
				className={styles.input}
				placeholder="Краткое описание"
			/>

			<textarea
				value={service.description}
				onChange={(event) =>
					onUpdate(serviceSlug, {
						description: event.target.value,
					})
				}
				rows={2}
				className={styles.textarea}
				placeholder="Полное описание"
			/>

			<div className={styles.rowGap}>
				<input
					type="number"
					value={service.price}
					onChange={(event) =>
						onUpdate(serviceSlug, {
							price: Number(event.target.value),
						})
					}
					className={`${styles.input} ${styles.inputNumber}`}
					placeholder="Цена"
				/>

				<input
					value={service.time}
					onChange={(event) =>
						onUpdate(serviceSlug, {
							time: event.target.value,
						})
					}
					className={`${styles.input} ${styles.inputMedium}`}
					placeholder="Время"
				/>
			</div>

			<div className={styles.categoryMeta}>
				<input
					value={service.meta.title}
					onChange={(event) =>
						onUpdate(serviceSlug, {
							meta: {
								...service.meta,
								title: event.target.value,
							},
						})
					}
					className={styles.input}
					placeholder="SEO заголовок"
				/>

				<input
					value={service.meta.description}
					onChange={(event) =>
						onUpdate(serviceSlug, {
							meta: {
								...service.meta,
								description: event.target.value,
							},
						})
					}
					className={styles.input}
					placeholder="SEO описание"
				/>
			</div>

			<div className={styles.innerServices}>
				<div className={styles.label}>Внутренние услуги:</div>

				{service.items.map((item, index) => (
					<div key={index} className={styles.innerItem}>
						<input
							value={item.title}
							onChange={(event) =>
								handleItemUpdate(index, {
									title: event.target.value,
								})
							}
							className={styles.input}
							placeholder="Название"
						/>

						<input
							type="number"
							value={item.price}
							onChange={(event) =>
								handleItemUpdate(index, {
									price: Number(event.target.value),
								})
							}
							className={`${styles.input} ${styles.inputNumber}`}
							placeholder="Цена"
						/>

						<button
							type="button"
							className={styles.btnRemoveItem}
							onClick={() => handleItemDelete(index)}
						>
							✕
						</button>
					</div>
				))}

				<button type="button" className={styles.btnAddItem} onClick={handleItemAdd}>
					+ Добавить внутреннюю услугу
				</button>
			</div>
		</div>
	);
}
