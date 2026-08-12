"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbArrowsDownUp } from "react-icons/tb";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { promoData } from "@/src/shared/data/promo/promo";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { PromoCard } from "@/src/widgets/promo/ui/PromoCard";

import styles from "./PromoGrid.module.scss";

interface PromoGridProps {}
// TODO: пагинацию в отдельный компонент вынести (и добавить реализацию если много страниц с переключением на слева и справа активные)

export function PromoGrid({}: PromoGridProps) {
	const { isMobile } = useDevice();
	const [currentTag, setCurrentTag] = useState<string>("Все");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = isMobile ? 3 : 9;

	const tags = useMemo(() => {
		const uniqueTags = Array.from(new Set(promoData.map((p) => p.serviceTag)));
		return ["Все", ...uniqueTags];
	}, [promoData]);

	const { openModal, closeModal } = useModal();

	const filteredPromos = useMemo(() => {
		if (currentTag === "Все") return promoData;
		return promoData.filter((promo) => promo.serviceTag === currentTag);
	}, [currentTag]);

	const totalPages = useMemo(() => {
		return Math.ceil(filteredPromos.length / itemsPerPage);
	}, [filteredPromos, itemsPerPage]);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(1);
		}
	}, [totalPages, currentPage]);

	const paginatedPromos = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return filteredPromos.slice(start, end);
	}, [filteredPromos, currentPage, itemsPerPage]);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const handleMobileTagSelect = () => {
		// Передаем в модалку пропсы с выбором тегов
		// TODO: сделать чтобы не закрывалось окно, чтобы обновлялись состояния + множественный выбор
		openModal("action", {
			content: (
				<MobileTagSelector
					count={filteredPromos.length > 10 ? "10+" : filteredPromos.length}
					tags={tags}
					currentTag={currentTag}
					onSelectTag={(selectedTag) => {
						setCurrentTag(selectedTag);
						closeModal(); // Закрываем после выбора
					}}
					onClose={closeModal}
				/>
			),
		});
	};

	return (
		<section className="container block-bottom">
			<div className={styles.promoGrid}>
				<button
					className={`${styles.mobileTagButton} desk-hide`}
					onClick={handleMobileTagSelect}
				>
					<TbArrowsDownUp />
					<div className={styles.mobileTagResult}>
						<span>Акции: </span>
						{currentTag}
					</div>
					<div className={styles.editIcon}>
						<FaRegEdit />
					</div>
				</button>

				{/*// TODO: реализовать свайпер для деск */}
				<nav className={`${styles.promoGrid__nav} mob-hide`}>
					{tags.map((tag) => (
						<button
							key={tag}
							onClick={() => setCurrentTag(tag)}
							className={`${currentTag === tag ? styles.navActive : ""} ${styles.promoGrid__nav_item}`}
						>
							{tag}
						</button>
					))}
				</nav>
				<div className={styles.promoGrid__grid}>
					{paginatedPromos.map((promo) => (
						<PromoCard key={promo.id} promo={promo} />
					))}
				</div>

				<div className={styles.pagination}>
					<button
						type="button"
						className={styles.pagination__btn}
						aria-label="Предыдущая страница"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<IoIosArrowBack size={20} color="#F84F0C" />
					</button>

					<div className={styles.pageWrap}>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={`${page === currentPage ? styles.active : ""} ${styles.pageNumber}`}
							>
								{page}
							</button>
						))}
					</div>

					<button
						type="button"
						className={styles.pagination__btn}
						aria-label="Следующая страница"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<IoIosArrowForward size={20} color="#F84F0C" />
					</button>
				</div>
			</div>
		</section>
	);
}
interface MobileTagSelectorProps {
	count: number | string;
	tags: string[];
	currentTag: string;
	onSelectTag: (tag: string) => void;
	onClose: () => void;
}

function MobileTagSelector({
	tags,
	count,
	currentTag,
	onSelectTag,
	onClose,
}: MobileTagSelectorProps) {
	return (
		<div className={styles.mobileTagSelector}>
			<h3 className={styles.tagTitle}>Выберите тему акции</h3>

			<div className={styles.tagContent}>
				<div className={styles.tagList}>
					{tags.map((tag) => (
						<button
							key={tag}
							className={`${styles.tagItem} ${currentTag === tag ? styles.active : ""}`}
							onClick={() => {
								onSelectTag(tag);
								// onSelectTag сам закроет модалку
							}}
						>
							{tag}
						</button>
					))}
				</div>

				<button className={styles.closeBtn} onClick={onClose}>
					Показать {count} результатов
				</button>
			</div>
		</div>
	);
}
