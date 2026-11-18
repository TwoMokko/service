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
} from "../../_lib/services";

import CategoryEditor from "./CategoryEditor";

import styles from "../../admin.module.scss";

export default function ServicesEditor() {
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
					Object.fromEntries(Object.keys(result.categories).map((slug) => [slug, false])),
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

	const handleToggleCategory = (slug: string) => {
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
		<>
			<div className={styles.headerButtons}>
				<button
					onClick={handleSave}
					disabled={saving}
					className={`${styles.btn} ${styles.btnSave}`}
				>
					{saving ? "Сохранение..." : "Сохранить всё с услугами"}
				</button>
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

					return (
						<CategoryEditor
							key={categorySlug}
							category={category}
							categorySlug={categorySlug}
							categoryServices={categoryServices}
							isExpanded={Boolean(expandedCategories[categorySlug])}
							onToggle={handleToggleCategory}
							onUpdateCategory={handleUpdateCategory}
							onUpdateService={handleUpdateService}
							onAddService={handleAddService}
							onDeleteCategory={handleDeleteCategory}
							onDeleteService={handleDeleteService}
							slugDrafts={slugDrafts}
							onSlugDraftChange={(key, value) =>
								setSlugDrafts((prev) => ({
									...prev,
									[key]: value,
								}))
							}
							onRenameCategory={handleRenameCategory}
							onRenameService={handleRenameService}
						/>
					);
				})}
			</section>

			<div className={styles.footer}>
				Всего: {Object.keys(data.services).length} услуг,{" "}
				{Object.keys(data.categories).length} категорий
			</div>
		</>
	);
}
