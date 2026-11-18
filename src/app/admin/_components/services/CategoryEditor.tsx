import type { Category, Service } from "@/src/shared/data/services/types";

import ServiceEditor from "./ServiceEditor";

import styles from "../../admin.module.scss";

interface CategoryEditorProps {
	category: Category;
	categorySlug: string;
	categoryServices: Service[];
	isExpanded: boolean;

	onToggle: (slug: string) => void;
	onUpdateCategory: (slug: string, changes: Partial<Category>) => void;
	onUpdateService: (slug: string, changes: Partial<Service>) => void;

	onAddService: (categorySlug: string) => void;
	onDeleteCategory: (slug: string) => void;
	onDeleteService: (slug: string) => void;

	slugDrafts: Record<string, string>;
	onSlugDraftChange: (key: string, value: string) => void;

	onRenameCategory: (slug: string) => void;
	onRenameService: (slug: string) => void;
}

export default function CategoryEditor({
	category,
	categorySlug,
	categoryServices,
	isExpanded,
	onToggle,
	onUpdateCategory,
	onUpdateService,
	onAddService,
	onDeleteCategory,
	onDeleteService,
	slugDrafts,
	onSlugDraftChange,
	onRenameCategory,
	onRenameService,
}: CategoryEditorProps) {
	const categoryDraftKey = `category:${categorySlug}`;

	return (
		<div className={styles.categoryCard}>
			<div className={styles.categoryHeader} onClick={() => onToggle(categorySlug)}>
				<div className={styles.categoryInfo}>
					<h3 className={styles.categoryTitle}>{category.title || "Без названия"}</h3>

					<span className={styles.categoryBadge}>{categoryServices.length} услуг</span>

					<span>{categorySlug}</span>
				</div>

				<div className={styles.categoryActions}>
					<button
						type="button"
						className={styles.btnCollapse}
						onClick={(event) => {
							event.stopPropagation();
							onToggle(categorySlug);
						}}
					>
						{isExpanded ? "Свернуть" : "Развернуть"}
					</button>

					<button
						type="button"
						className={styles.btnDelete}
						onClick={(event) => {
							event.stopPropagation();
							onDeleteCategory(categorySlug);
						}}
					>
						Удалить категорию
					</button>
				</div>
			</div>

			{isExpanded && (
				<div className={styles.categoryContent}>
					<div className={styles.categoryFields}>
						<input
							value={category.title}
							onChange={(event) =>
								onUpdateCategory(categorySlug, {
									title: event.target.value,
								})
							}
							className={styles.input}
							placeholder="Название категории"
						/>

						<div className={styles.slugWrap}>
							<label className={styles.label}>Slug категории</label>

							<input
								className={styles.input}
								value={slugDrafts[categoryDraftKey] ?? categorySlug}
								onChange={(event) =>
									onSlugDraftChange(categoryDraftKey, event.target.value)
								}
							/>

							<button
								type="button"
								className={styles.btn}
								onClick={() => onRenameCategory(categorySlug)}
							>
								Изменить slug
							</button>
						</div>

						<textarea
							value={category.description}
							onChange={(event) =>
								onUpdateCategory(categorySlug, {
									description: event.target.value,
								})
							}
							rows={3}
							className={`${styles.textarea} ${styles.categoryDescription}`}
							placeholder="Описание категории"
						/>

						<div className={styles.categoryMeta}>
							<input
								value={category.meta.title}
								onChange={(event) =>
									onUpdateCategory(categorySlug, {
										meta: {
											...category.meta,
											title: event.target.value,
										},
									})
								}
								className={styles.input}
								placeholder="SEO заголовок"
							/>

							<input
								value={category.meta.description}
								onChange={(event) =>
									onUpdateCategory(categorySlug, {
										meta: {
											...category.meta,
											description: event.target.value,
										},
									})
								}
								className={styles.input}
								placeholder="SEO описание"
							/>
						</div>
					</div>

					<div className={styles.servicesHeader}>
						<h4>Услуги категории</h4>

						<button
							type="button"
							className={styles.btnAdd}
							onClick={() => onAddService(categorySlug)}
						>
							+ Добавить услугу
						</button>
					</div>

					{categoryServices.map((service) => {
						const serviceDraftKey = `service:${service.slug}`;

						return (
							<ServiceEditor
								key={service.slug}
								service={service}
								onUpdate={onUpdateService}
								onDelete={onDeleteService}
								slugDraft={slugDrafts[serviceDraftKey] ?? service.slug}
								onSlugDraftChange={(value) =>
									onSlugDraftChange(serviceDraftKey, value)
								}
								onRename={onRenameService}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
