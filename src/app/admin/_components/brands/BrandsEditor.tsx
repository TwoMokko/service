"use client";

import { useEffect, useState } from "react";

import { Brand } from "@/src/shared/data/brands/types";

import styles from "../../admin.module.scss";

export default function BrandsEditor() {
	const [brands, setBrands] = useState<Record<string, Brand>>({});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState("");
	const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const loadBrands = async () => {
			try {
				const response = await fetch("/api/admin/brands");

				if (!response.ok) {
					throw new Error("Ошибка загрузки брендов");
				}

				const data: Record<string, Brand> = await response.json();
				const firstSlug = Object.keys(data)[0];

				if (firstSlug) {
					setSelectedSlug(firstSlug);
				}

				setBrands(data);
			} catch (error) {
				console.error(error);
				setMessage("Не удалось загрузить бренды");
			} finally {
				setLoading(false);
			}
		};

		loadBrands();
	}, []);

	const validateBrands = () => {
		for (const [slug, brand] of Object.entries(brands)) {
			if (!slug.trim()) {
				return "У бренда не указан slug.";
			}

			if (!slug.trim()) {
				return "У бренда не указан slug.";
			}

			if (brand.id !== slug) {
				return `Slug и ID бренда «${brand.title || slug}» не совпадают.`;
			}

			if (!brand.title.trim()) {
				return `У бренда «${slug}» не указано название.`;
			}

			if (!brand.title.trim()) {
				return `У бренда «${slug}» не указано название.`;
			}
		}

		return null;
	};

	const handleSave = async () => {
		const validationError = validateBrands();

		if (validationError) {
			setMessage(validationError);
			return;
		}

		setSaving(true);
		setMessage("");

		try {
			const response = await fetch("/api/admin/brands", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(brands),
			});

			if (!response.ok) {
				throw new Error("Ошибка сохранения брендов");
			}

			setMessage("Сохранено!");
		} catch (error) {
			console.error(error);
			setMessage("Не удалось сохранить бренды");
		} finally {
			setSaving(false);
		}
	};
	const handleAddBrand = () => {
		const baseSlug = "new-brand";
		let newSlug = baseSlug;
		let counter = 1;

		while (newSlug in brands) {
			newSlug = `${baseSlug}-${counter}`;
			counter++;
		}

		const newBrand: Brand = {
			id: newSlug,
			title: "Новый бренд",
			href: "",
			description: "",
			info: {
				title: "",
				content: [],
			},
			prices: [],
			meta: {
				title: "",
				description: "",
			},
			salons: [],
		};

		setBrands((prev) => ({
			...prev,
			[newSlug]: newBrand,
		}));

		setSelectedSlug(newSlug);
	};

	const handleDeleteBrand = async () => {
		if (!selectedSlug) return;

		const confirmed = window.confirm(
			`Удалить бренд «${brands[selectedSlug].title}»? Это действие нельзя отменить.`,
		);

		if (!confirmed) return;

		const updatedBrands = { ...brands };
		delete updatedBrands[selectedSlug];

		setSaving(true);
		setMessage("");

		try {
			const response = await fetch("/api/admin/brands", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedBrands),
			});

			if (!response.ok) {
				throw new Error("Ошибка удаления бренда");
			}

			setBrands(updatedBrands);
			setSelectedSlug(Object.keys(updatedBrands)[0] ?? null);
			setMessage("Бренд удалён");
		} catch (error) {
			console.error(error);
			setMessage("Не удалось удалить бренд");
		} finally {
			setSaving(false);
		}
	};
	const handleUpdateSlug = (value: string) => {
		if (!selectedSlug) return;

		// Разрешаем латиницу, цифры и дефисы
		const newSlug = value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9-]+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "");

		setBrands((prev) => {
			if (newSlug && newSlug !== selectedSlug && newSlug in prev) {
				setMessage("Такой slug уже существует");
				return prev;
			}

			const updatedBrand = {
				...prev[selectedSlug],
				id: newSlug,
			};

			const updatedBrands = { ...prev };

			delete updatedBrands[selectedSlug];

			if (newSlug) {
				updatedBrands[newSlug] = updatedBrand;
			} else {
				updatedBrands[selectedSlug] = updatedBrand;
			}

			return updatedBrands;
		});

		if (newSlug) {
			setSelectedSlug(newSlug);
		}
	};
	const handleUpdateBrand = (field: keyof Brand, value: Brand[keyof Brand]) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				[field]: value,
			},
		}));
	};

	const handleUpdateMeta = (field: "title" | "description", value: string) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				meta: {
					...prev[selectedSlug].meta,
					[field]: value,
				},
			},
		}));
	};
	const handleUpdateInfoBlockTitle = (value: string) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				info: {
					...prev[selectedSlug].info,
					title: value,
				},
			},
		}));
	};

	const handleUpdateInfoTitle = (index: number, value: string) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				info: {
					...prev[selectedSlug].info,
					content: prev[selectedSlug].info.content.map((item, i) =>
						i === index ? { ...item, title: value } : item,
					),
				},
			},
		}));
	};

	const handleUpdateInfoParagraph = (
		sectionIndex: number,
		paragraphIndex: number,
		value: string,
	) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				info: {
					...prev[selectedSlug].info,
					content: prev[selectedSlug].info.content.map((item, i) =>
						i === sectionIndex
							? {
									...item,
									paragraphs: item.paragraphs.map((paragraph, j) =>
										j === paragraphIndex ? value : paragraph,
									),
								}
							: item,
					),
				},
			},
		}));
	};

	const handleAddInfoParagraph = (sectionIndex: number) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				info: {
					...prev[selectedSlug].info,
					content: prev[selectedSlug].info.content.map((item, index) =>
						index === sectionIndex
							? { ...item, paragraphs: [...item.paragraphs, ""] }
							: item,
					),
				},
			},
		}));
	};

	const handleDeleteInfoParagraph = (sectionIndex: number, paragraphIndex: number) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				info: {
					...prev[selectedSlug].info,
					content: prev[selectedSlug].info.content.map((item, index) =>
						index === sectionIndex
							? {
									...item,
									paragraphs: item.paragraphs.filter(
										(_, i) => i !== paragraphIndex,
									),
								}
							: item,
					),
				},
			},
		}));
	};

	const handleAddInfoSection = () => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				info: {
					...prev[selectedSlug].info,
					content: [
						...prev[selectedSlug].info.content,
						{
							title: "",
							paragraphs: [""],
						},
					],
				},
			},
		}));
	};

	const handleDeleteInfoSection = (sectionIndex: number) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				info: {
					...prev[selectedSlug].info,
					content: prev[selectedSlug].info.content.filter(
						(_, index) => index !== sectionIndex,
					),
				},
			},
		}));
	};

	const handleUpdatePriceTitle = (priceIndex: number, value: string) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				prices: prev[selectedSlug].prices.map((price, index) =>
					index === priceIndex ? { ...price, title: value } : price,
				),
			},
		}));
	};

	const handleUpdatePriceItem = (
		priceIndex: number,
		itemIndex: number,
		field: "title" | "subtitle" | "price",
		value: string | number,
	) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				prices: prev[selectedSlug].prices.map((price, index) =>
					index === priceIndex
						? {
								...price,
								items: price.items.map((item, i) =>
									i === itemIndex ? { ...item, [field]: value } : item,
								),
							}
						: price,
				),
			},
		}));
	};

	const handleAddPriceItem = (priceIndex: number) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				prices: prev[selectedSlug].prices.map((price, index) =>
					index === priceIndex
						? {
								...price,
								items: [
									...price.items,
									{
										title: "",
										subtitle: "",
										price: 0,
									},
								],
							}
						: price,
				),
			},
		}));
	};

	const handleDeletePriceItem = (priceIndex: number, itemIndex: number) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				prices: prev[selectedSlug].prices.map((price, index) =>
					index === priceIndex
						? {
								...price,
								items: price.items.filter((_, i) => i !== itemIndex),
							}
						: price,
				),
			},
		}));
	};

	const handleAddPrice = () => {
		if (!selectedSlug) return;

		setBrands((prev) => {
			const currentPrices = prev[selectedSlug].prices;

			const newId =
				currentPrices.length > 0
					? Math.max(...currentPrices.map((price) => price.id)) + 1
					: 1;

			return {
				...prev,
				[selectedSlug]: {
					...prev[selectedSlug],
					prices: [
						...currentPrices,
						{
							id: newId,
							title: "",
							items: [
								{
									title: "",
									subtitle: "",
									price: 0,
								},
							],
						},
					],
				},
			};
		});
	};

	const handleDeletePrice = (priceIndex: number) => {
		if (!selectedSlug) return;

		setBrands((prev) => ({
			...prev,
			[selectedSlug]: {
				...prev[selectedSlug],
				prices: prev[selectedSlug].prices.filter((_, index) => index !== priceIndex),
			},
		}));
	};

	const brandSlugs = Object.keys(brands);

	const filteredSlugs = brandSlugs.filter((slug) => {
		const brand = brands[slug];

		return (
			brand.title.toLowerCase().includes(search.toLowerCase()) ||
			slug.toLowerCase().includes(search.toLowerCase())
		);
	});

	const selectedBrand = selectedSlug ? brands[selectedSlug] : null;

	if (loading) {
		return <p>Загрузка брендов...</p>;
	}

	return (
		<section>
			<div className={styles.sectionHeader}>
				<h2>Бренды ({brandSlugs.length})</h2>

				<button type="button" className={styles.btn} onClick={handleSave} disabled={saving}>
					{saving ? "Сохранение..." : "Сохранить"}
				</button>
			</div>
			<button type="button" onClick={handleAddBrand}>
				+ Добавить бренд
			</button>

			{message && <p>{message}</p>}

			<div className={styles.editorLayout}>
				<aside>
					<input
						type="search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Поиск бренда..."
					/>

					<div className={styles.brandsList}>
						{filteredSlugs.map((slug) => (
							<button
								key={slug}
								type="button"
								onClick={() => setSelectedSlug(slug)}
								aria-pressed={selectedSlug === slug}
							>
								{brands[slug].title}
							</button>
						))}
					</div>
				</aside>

				<div>
					{selectedBrand ? (
						<div>
							<div>
								<button type="button" onClick={handleDeleteBrand}>
									Удалить бренд
								</button>
							</div>
							<h3>Основная информация</h3>

							<label>
								Название
								<input
									value={selectedBrand.title}
									onChange={(event) =>
										handleUpdateBrand("title", event.target.value)
									}
								/>
							</label>

							<label>
								ID / slug
								<input
									value={selectedSlug ?? ""}
									onChange={(event) => handleUpdateSlug(event.target.value)}
									placeholder="brand-name"
								/>
							</label>

							<label>
								Ссылка
								<input
									value={selectedBrand.href}
									onChange={(event) =>
										handleUpdateBrand("href", event.target.value)
									}
								/>
							</label>

							<label>
								Краткое описание
								<textarea
									value={selectedBrand.description}
									onChange={(event) =>
										handleUpdateBrand("description", event.target.value)
									}
								/>
							</label>

							<h3>Салоны</h3>

							{(["salon1", "salon2", "salon3"] as const).map((salon) => (
								<label key={salon}>
									<input
										type="checkbox"
										checked={selectedBrand.salons.includes(salon)}
										onChange={(event) => {
											const salons = event.target.checked
												? [...selectedBrand.salons, salon]
												: selectedBrand.salons.filter(
														(item) => item !== salon,
													);

											handleUpdateBrand("salons", salons);
										}}
									/>
									{salon}
								</label>
							))}

							<h3>SEO</h3>

							<label>
								SEO-заголовок
								<input
									value={selectedBrand.meta.title}
									onChange={(event) =>
										handleUpdateMeta("title", event.target.value)
									}
								/>
							</label>

							<label>
								SEO-описание
								<textarea
									value={selectedBrand.meta.description}
									onChange={(event) =>
										handleUpdateMeta("description", event.target.value)
									}
								/>
							</label>

							<h3>Информация о бренде</h3>
							<label>
								Заголовок информационного блока
								<input
									value={selectedBrand.info.title ?? ""}
									onChange={(event) =>
										handleUpdateInfoBlockTitle(event.target.value)
									}
								/>
							</label>

							{selectedBrand.info.content.map((item, index) => (
								<div key={index}>
									<label>
										Заголовок раздела
										<input
											value={item.title}
											onChange={(event) =>
												handleUpdateInfoTitle(index, event.target.value)
											}
										/>
									</label>
									<button
										type="button"
										onClick={() => handleDeleteInfoSection(index)}
									>
										Удалить раздел
									</button>

									{item.paragraphs.map((paragraph, paragraphIndex) => (
										<div key={paragraphIndex}>
											<label>
												Абзац {paragraphIndex + 1}
												<textarea
													value={paragraph}
													onChange={(event) =>
														handleUpdateInfoParagraph(
															index,
															paragraphIndex,
															event.target.value,
														)
													}
												/>
											</label>

											<button
												type="button"
												onClick={() =>
													handleDeleteInfoParagraph(index, paragraphIndex)
												}
											>
												Удалить абзац
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={() => handleAddInfoParagraph(index)}
									>
										+ Добавить абзац
									</button>
								</div>
							))}
							<button type="button" onClick={handleAddInfoSection}>
								+ Добавить раздел
							</button>

							<h3>Цены</h3>

							{selectedBrand.prices.map((price, priceIndex) => (
								<div key={price.id}>
									<h4>Прайс-лист {priceIndex + 1}</h4>
									<button
										type="button"
										onClick={() => handleDeletePrice(priceIndex)}
									>
										Удалить прайс-лист
									</button>

									<label>
										Название прайс-листа
										<input
											value={price.title}
											onChange={(event) =>
												handleUpdatePriceTitle(
													priceIndex,
													event.target.value,
												)
											}
										/>
									</label>

									{price.items.map((item, itemIndex) => (
										<div key={itemIndex}>
											<label>
												Название услуги
												<input
													value={item.title}
													onChange={(event) =>
														handleUpdatePriceItem(
															priceIndex,
															itemIndex,
															"title",
															event.target.value,
														)
													}
												/>
											</label>

											<label>
												Подзаголовок
												<input
													value={item.subtitle}
													onChange={(event) =>
														handleUpdatePriceItem(
															priceIndex,
															itemIndex,
															"subtitle",
															event.target.value,
														)
													}
												/>
											</label>

											<label>
												Цена
												<input
													type="number"
													value={item.price}
													onChange={(event) =>
														handleUpdatePriceItem(
															priceIndex,
															itemIndex,
															"price",
															Number(event.target.value),
														)
													}
												/>
											</label>

											<button
												type="button"
												onClick={() =>
													handleDeletePriceItem(priceIndex, itemIndex)
												}
											>
												Удалить позицию
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={() => handleAddPriceItem(priceIndex)}
									>
										+ Добавить позицию
									</button>
								</div>
							))}

							<button type="button" onClick={handleAddPrice}>
								+ Добавить прайс-лист
							</button>
						</div>
					) : (
						<p>Выбери бренд из списка</p>
					)}
				</div>
			</div>
		</section>
	);
}
