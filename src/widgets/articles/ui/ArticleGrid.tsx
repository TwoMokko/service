"use client";

import React, { useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TbArrowsDownUp } from "react-icons/tb";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { ArticleWithService } from "@/src/shared/data/articles";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { MultiSelectFilter } from "@/src/shared/ui/multiSelectFilter/MultiSelectFilter";
import { Pagination } from "@/src/shared/ui/pagination/Pagination";

import { ArticleCard } from "./ArticleCard";

import styles from "./ArticleGrid.module.scss";

const ALL_TAG = "Все";

interface ArticleGridProps {
	articles: ArticleWithService[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
	const { isMobile } = useDevice();
	const { openModal, closeModal } = useModal();

	const [selectedTags, setSelectedTags] = useState<string[]>([ALL_TAG]);
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = isMobile ? 3 : 9;

	const tags = useMemo(() => {
		const uniqueTags = Array.from(new Set(articles.map((article) => article.category.title)));

		return [ALL_TAG, ...uniqueTags];
	}, []);

	// Получение акций по выбранным категориям
	const getFilteredArticles = (selected: string[]): ArticleWithService[] => {
		if (selected.includes(ALL_TAG) || selected.length === 0) {
			return articles;
		}

		return articles.filter((article) => selected.includes(article.category.title));
	};

	const filteredArticles = useMemo(() => getFilteredArticles(selectedTags), [selectedTags]);

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

	const getArticleCount = (selected: string[]) => {
		return articles.filter((article) => {
			return selected.includes(ALL_TAG) || selected.includes(article.category.title);
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
					getResultCount={getArticleCount}
					onApply={applyFilters}
					onClose={closeModal}
				/>
			),
		});
	};

	const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
	const safePage = Math.min(currentPage, Math.max(totalPages, 1));

	const paginatedArticles = useMemo(() => {
		const start = (safePage - 1) * itemsPerPage;

		return filteredArticles.slice(start, start + itemsPerPage);
	}, [filteredArticles, safePage, itemsPerPage]);

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
			<div className={styles.articleGrid}>
				<button
					type="button"
					className={`${styles.mobileTagButton} desk-hide`}
					onClick={handleMobileTagSelect}
				>
					<TbArrowsDownUp />

					<div className={styles.mobileTagResult}>
						<span>Статьи: </span>
						{mobileFilterLabel}
					</div>

					<div className={styles.editIcon}>
						<FaRegEdit />
					</div>
				</button>

				{/* Десктопная навигация */}
				<nav className={`${styles.articleGrid__nav} mob-hide`}>
					{tags.map((tag) => (
						<button
							key={tag}
							type="button"
							aria-pressed={selectedTags.includes(tag)}
							onClick={() => handleDesktopTagSelect(tag)}
							className={`
                                ${selectedTags.includes(tag) ? styles.navActive : ""}
                                ${styles.articleGrid__nav_item}
                            `}
						>
							{tag}
						</button>
					))}
				</nav>

				<div className={styles.articleGrid__grid}>
					{paginatedArticles.length > 0 ? (
						paginatedArticles.map((article) => (
							<ArticleCard key={article.slug} article={article} />
						))
					) : (
						<p>Статей по выбранным темам пока нет.</p>
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
