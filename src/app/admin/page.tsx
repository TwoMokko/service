"use client";

import { useEffect, useState } from "react";

import type { Category, Service } from "@/src/shared/data/services/types";

import {
	AdminData,
	addCategory,
	addService,
	deleteCategory,
	deleteService,
	renameCategory,
	renameService,
	updateCategory,
	updateService,
} from "./utils";

import styles from "./admin.module.scss";

export default function AdminPage() {
	const [data, setData] = useState<AdminData | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState("");
	const [slugDrafts, setSlugDrafts] = useState<Record<string, string>>({});
	const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

	useEffect(() => {
		async function loadData() {
			try {
				const response = await fetch("/api/admin/data");

				if (!response.ok) {
					throw new Error("Не удалось загрузить данные");
				}

				const result: AdminData = await response.json();

				setData(result);

				setExpandedCategories(
					Object.fromEntries(Object.keys(result.categories).map((slug) => [slug, true])),
				);
			} catch {
				setMessage("Ошибка загрузки данных");
			} finally {
				setLoading(false);
			}
		}

		loadData();
	}, []);

	const handleSave = async () => {
		if (!data) return;

		setSaving(true);
		setMessage("");

		try {
			const response = await fetch("/api/admin/data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Ошибка сохранения");
			}

			const result = await response.json();

			if (!result.success) {
				throw new Error("Не удалось сохранить данные");
			}

			setMessage("Сохранено!");
		} catch {
			setMessage("Ошибка сохранения данных");
		} finally {
			setSaving(false);
		}
	};

	const handleUpdateCategory = (slug: string, changes: Partial<Category>) => {
		setData((prev) => (prev ? updateCategory(prev, slug, changes) : prev));
	};

	const handleUpdateService = (slug: string, changes: Partial<Service>) => {
		setData((prev) => (prev ? updateService(prev, slug, changes) : prev));
	};

	const handleAddCategory = () => {
		setData((prev) => {
			if (!prev) return prev;

			const next = addCategory(prev);
			const newSlug = Object.keys(next.categories).find((slug) => !prev.categories[slug]);

			if (newSlug) {
				setExpandedCategories((current) => ({
					...current,
					[newSlug]: true,
				}));
			}

			return next;
		});
	};

	const handleAddService = (categorySlug: string) => {
		setData((prev) => (prev ? addService(prev, categorySlug) : prev));
	};

	const handleDeleteService = (slug: string) => {
		if (!confirm("Удалить услугу?")) return;

		setData((prev) => (prev ? deleteService(prev, slug) : prev));
	};

	const handleDeleteCategory = (slug: string) => {
		if (!confirm("Удалить категорию и все её услуги?")) return;

		setData((prev) => (prev ? deleteCategory(prev, slug) : prev));
	};

	const handleRenameCategory = (oldSlug: string) => {
		if (!data) return;

		const newSlug = slugDrafts[`category:${oldSlug}`] ?? oldSlug;

		try {
			setData(renameCategory(data, oldSlug, newSlug));

			setSlugDrafts((prev) => {
				const next = { ...prev };
				delete next[`category:${oldSlug}`];
				return next;
			});
		} catch (error) {
			setMessage(error instanceof Error ? error.message : "Ошибка изменения slug");
		}
	};

	const handleRenameService = (oldSlug: string) => {
		if (!data) return;

		const newSlug = slugDrafts[`service:${oldSlug}`] ?? oldSlug;

		try {
			setData(renameService(data, oldSlug, newSlug));

			setSlugDrafts((prev) => {
				const next = { ...prev };
				delete next[`service:${oldSlug}`];
				return next;
			});
		} catch (error) {
			setMessage(error instanceof Error ? error.message : "Ошибка изменения slug");
		}
	};

	const toggleCategory = (slug: string) => {
		setExpandedCategories((prev) => ({
			...prev,
			[slug]: !prev[slug],
		}));
	};

	if (loading) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	if (!data) {
		return <div className={styles.errorText}>{message || "Ошибка загрузки"}</div>;
	}

	const categoryEntries = Object.entries(data.categories);

	return (
		<div className={styles.adminPage}>
			<div className={styles.header}>
				<h1>Админка</h1>

				<div className={styles.headerButtons}>
					<button
						onClick={handleSave}
						disabled={saving}
						className={`${styles.btn} ${styles.btnSave}`}
					>
						{saving ? "Сохранение..." : "Сохранить все"}
					</button>
				</div>
			</div>

			{message && (
				<div
					className={`${styles.message} ${
						message === "Сохранено!" ? styles.messageSuccess : styles.messageError
					}`}
				>
					{message}
				</div>
			)}

			<section className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2>Категории и услуги ({categoryEntries.length})</h2>

					<button
						onClick={handleAddCategory}
						className={`${styles.btn} ${styles.btnAdd}`}
					>
						+ Добавить категорию
					</button>
				</div>

				{categoryEntries.map(([categorySlug, category]) => {
					const categoryServices = category.serviceSlugs
						.map((slug) => data.services[slug])
						.filter((service): service is Service => Boolean(service));

					const isExpanded = expandedCategories[categorySlug];

					return (
						<div key={categorySlug} className={styles.categoryCard}>
							<div
								className={styles.categoryHeader}
								onClick={() => toggleCategory(categorySlug)}
							>
								<div className={styles.categoryInfo}>
									<span className={styles.categoryTitle}>
										{category.title || "Без названия"}
									</span>

									<span className={styles.categoryBadge}>
										{categoryServices.length} услуг
									</span>

									<span className={styles.categoryBadge}>{categorySlug}</span>
								</div>

								<div className={styles.categoryActions}>
									<button
										className={styles.btnCollapse}
										onClick={(event) => {
											event.stopPropagation();
											toggleCategory(categorySlug);
										}}
									>
										{isExpanded ? "▲" : "▼"}
									</button>

									<button
										className={styles.btnDelete}
										onClick={(event) => {
											event.stopPropagation();
											handleDeleteCategory(categorySlug);
										}}
									>
										✕
									</button>
								</div>
							</div>

							{isExpanded && (
								<div className={styles.categoryContent}>
									<div className={styles.categoryFields}>
										<input
											value={category.title}
											onChange={(event) =>
												handleUpdateCategory(categorySlug, {
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
												value={
													slugDrafts[`category:${category.slug}`] ??
													category.slug
												}
												onChange={(e) =>
													setSlugDrafts((prev) => ({
														...prev,
														[`category:${category.slug}`]:
															e.target.value,
													}))
												}
											/>

											<button
												type="button"
												className={styles.btn}
												onClick={() => handleRenameCategory(category.slug)}
											>
												Изменить slug
											</button>
										</div>

										<textarea
											value={category.description}
											onChange={(event) =>
												handleUpdateCategory(categorySlug, {
													description: event.target.value,
												})
											}
											className={styles.categoryDescription}
											placeholder="Описание категории"
											rows={2}
										/>

										<div className={styles.categoryMeta}>
											<input
												value={category.meta.title}
												onChange={(event) =>
													handleUpdateCategory(categorySlug, {
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
													handleUpdateCategory(categorySlug, {
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

									<div>
										<div className={styles.servicesHeader}>
											<h4>Услуги ({categoryServices.length})</h4>

											<button
												className={`${styles.btn} ${styles.btnAdd}`}
												onClick={() => handleAddService(categorySlug)}
											>
												+ Добавить услугу
											</button>
										</div>

										{categoryServices.map((service) => {
											const serviceSlug = service.slug;

											return (
												<div
													key={serviceSlug}
													className={styles.serviceCard}
												>
													<div className={styles.serviceHeader}>
														<input
															value={service.title}
															onChange={(event) =>
																handleUpdateService(serviceSlug, {
																	title: event.target.value,
																})
															}
															className={`${styles.input} ${styles.serviceTitle}`}
															placeholder="Название услуги"
														/>

														<span>{serviceSlug}</span>

														<button
															className={styles.btnDelete}
															onClick={() =>
																handleDeleteService(serviceSlug)
															}
														>
															✕
														</button>
													</div>

													<div className={styles.slugWrap}>
														<label className={styles.label}>
															Slug услуги
														</label>

														<input
															className={styles.input}
															value={
																slugDrafts[
																	`service:${service.slug}`
																] ?? service.slug
															}
															onChange={(e) =>
																setSlugDrafts((prev) => ({
																	...prev,
																	[`service:${service.slug}`]:
																		e.target.value,
																}))
															}
														/>

														<button
															type="button"
															className={styles.btn}
															onClick={() =>
																handleRenameService(service.slug)
															}
														>
															Изменить slug
														</button>
													</div>

													<input
														value={service.shortDescription}
														onChange={(event) =>
															handleUpdateService(serviceSlug, {
																shortDescription:
																	event.target.value,
															})
														}
														className={styles.input}
														placeholder="Краткое описание"
													/>

													<textarea
														value={service.description}
														onChange={(event) =>
															handleUpdateService(serviceSlug, {
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
																handleUpdateService(serviceSlug, {
																	price: Number(
																		event.target.value,
																	),
																})
															}
															className={`${styles.input} ${styles.inputNumber}`}
															placeholder="Цена"
														/>

														<input
															value={service.time}
															onChange={(event) =>
																handleUpdateService(serviceSlug, {
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
																handleUpdateService(serviceSlug, {
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
																handleUpdateService(serviceSlug, {
																	meta: {
																		...service.meta,
																		description:
																			event.target.value,
																	},
																})
															}
															className={styles.input}
															placeholder="SEO описание"
														/>
													</div>

													<div className={styles.innerServices}>
														<div className={styles.label}>
															Внутренние услуги:
														</div>

														{service.items.map((item, index) => (
															<div
																key={index}
																className={styles.innerItem}
															>
																<input
																	value={item.title}
																	onChange={(event) => {
																		const items =
																			service.items.map(
																				(current, i) =>
																					i === index
																						? {
																								...current,
																								title: event
																									.target
																									.value,
																							}
																						: current,
																			);

																		handleUpdateService(
																			serviceSlug,
																			{
																				items,
																			},
																		);
																	}}
																	className={styles.input}
																	placeholder="Название"
																/>

																<input
																	type="number"
																	value={item.price}
																	onChange={(event) => {
																		const items =
																			service.items.map(
																				(current, i) =>
																					i === index
																						? {
																								...current,
																								price: Number(
																									event
																										.target
																										.value,
																								),
																							}
																						: current,
																			);

																		handleUpdateService(
																			serviceSlug,
																			{
																				items,
																			},
																		);
																	}}
																	className={`${styles.input} ${styles.inputNumber}`}
																	placeholder="Цена"
																/>

																<button
																	className={styles.btnRemoveItem}
																	onClick={() => {
																		handleUpdateService(
																			serviceSlug,
																			{
																				items: service.items.filter(
																					(_, i) =>
																						i !== index,
																				),
																			},
																		);
																	}}
																>
																	✕
																</button>
															</div>
														))}

														<button
															className={styles.btnAddItem}
															onClick={() =>
																handleUpdateService(serviceSlug, {
																	items: [
																		...service.items,
																		{ title: "", price: 0 },
																	],
																})
															}
														>
															+ Добавить внутреннюю услугу
														</button>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</section>

			<div className={styles.footer}>
				Всего: {Object.keys(data.services).length} услуг,{" "}
				{Object.keys(data.categories).length} категорий
			</div>
		</div>
	);
}
