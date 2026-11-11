"use client";

import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import styles from "./Pagination.module.scss";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	if (totalPages <= 1) return null;

	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

	return (
		<div className={styles.pagination}>
			<button
				type="button"
				className={styles.pagination__btn}
				aria-label="Предыдущая страница"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<IoIosArrowBack size={20} color="#F84F0C" />
			</button>

			<div className={styles.pageWrap}>
				{pages.map((page) => (
					<button
						key={page}
						type="button"
						aria-current={page === currentPage ? "page" : undefined}
						onClick={() => onPageChange(page)}
						className={`
                            ${page === currentPage ? styles.active : ""}
                            ${styles.pageNumber}
                        `}
					>
						{page}
					</button>
				))}
			</div>

			<button
				type="button"
				className={styles.pagination__btn}
				aria-label="Следующая страница"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<IoIosArrowForward size={20} color="#F84F0C" />
			</button>
		</div>
	);
}
