"use client";

import React, { useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TbArrowsDownUp } from "react-icons/tb";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { promoData } from "@/src/shared/data/promo/promo";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { MultiSelectFilter } from "@/src/shared/ui/multiSelectFilter/MultiSelectFilter";
import { Pagination } from "@/src/shared/ui/pagination/Pagination";

import { PromoCard } from "./PromoCard";

import styles from "./PromoGrid.module.scss";

const ALL_TAG = "Все";

type Promo = (typeof promoData)[number];

interface PromoGridProps {}

export function PromoGrid({}: PromoGridProps) {
	const { isMobile } = useDevice();
	const { openModal, closeModal } = useModal();

	const [selectedTags, setSelectedTags] = useState<string[]>([ALL_TAG]);
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = isMobile ? 3 : 9;

	const tags = useMemo(() => {
		const uniqueTags = Array.from(new Set(promoData.map((promo) => promo.serviceTag)));

		return [ALL_TAG, ...uniqueTags];
	}, []);

	// Получение акций по выбранным категориям
	const getFilteredPromos = (selected: string[]): Promo[] => {
		if (selected.includes(ALL_TAG) || selected.length === 0) {
			return promoData;
		}

		return promoData.filter((promo) => selected.includes(promo.serviceTag));
	};

	const filteredPromos = useMemo(() => getFilteredPromos(selectedTags), [selectedTags]);

	// Выбор нескольких категорий
	const toggleTag = (tag: string, current: string[]) => {
		if (tag === ALL_TAG) {
			return [ALL_TAG];
		}

		const next = current.filter((item) => item !== ALL_TAG);

		const updated = next.includes(tag) ? next.filter((item) => item !== tag) : [...next, tag];

		return updated.length > 0 ? updated : [ALL_TAG];
	};

	const applyFilters = (nextTags: string[]) => {
		setSelectedTags(nextTags);
		setCurrentPage(1);
		closeModal();
	};

	// Десктопный фильтр
	const handleDesktopTagSelect = (tag: string) => {
		setSelectedTags((current) => toggleTag(tag, current));
		setCurrentPage(1);
	};

	const getPromoCount = (selected: string[]) => {
		return promoData.filter((promo) => {
			return selected.includes(ALL_TAG) || selected.includes(promo.serviceTag);
		}).length;
	};

	// Мобильный фильтр
	const handleMobileTagSelect = () => {
		openModal("action", {
			content: (
				<MultiSelectFilter
					title="Выберите тему акции"
					options={tags}
					selectedOptions={selectedTags}
					getResultCount={getPromoCount}
					onApply={applyFilters}
					onClose={closeModal}
				/>
			),
		});
	};

	const totalPages = Math.ceil(filteredPromos.length / itemsPerPage);
	const safePage = Math.min(currentPage, Math.max(totalPages, 1));

	const paginatedPromos = useMemo(() => {
		const start = (safePage - 1) * itemsPerPage;

		return filteredPromos.slice(start, start + itemsPerPage);
	}, [filteredPromos, safePage, itemsPerPage]);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const mobileFilterLabel = selectedTags.includes(ALL_TAG)
		? ALL_TAG
		: `Выбрано: ${selectedTags.length}`;

	return (
		<section className="container block-bottom">
			<div className={styles.promoGrid}>
				<button
					type="button"
					className={`${styles.mobileTagButton} desk-hide`}
					onClick={handleMobileTagSelect}
				>
					<TbArrowsDownUp />

					<div className={styles.mobileTagResult}>
						<span>Акции: </span>
						{mobileFilterLabel}
					</div>

					<div className={styles.editIcon}>
						<FaRegEdit />
					</div>
				</button>

				{/* Десктопная навигация */}
				<nav className={`${styles.promoGrid__nav} mob-hide`}>
					{tags.map((tag) => (
						<button
							key={tag}
							type="button"
							aria-pressed={selectedTags.includes(tag)}
							onClick={() => handleDesktopTagSelect(tag)}
							className={`
                                ${selectedTags.includes(tag) ? styles.navActive : ""}
                                ${styles.promoGrid__nav_item}
                            `}
						>
							{tag}
						</button>
					))}
				</nav>

				<div className={styles.promoGrid__grid}>
					{paginatedPromos.length > 0 ? (
						paginatedPromos.map((promo) => <PromoCard key={promo.id} promo={promo} />)
					) : (
						<p>Акций по выбранным темам пока нет.</p>
					)}
				</div>

				<Pagination
					currentPage={safePage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</section>
	);
}
