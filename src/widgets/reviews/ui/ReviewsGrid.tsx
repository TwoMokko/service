"use client";

import React, { useMemo, useRef, useState } from "react";

import { Review } from "@/src/shared/data/reviews/types";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { Pagination } from "@/src/shared/ui/pagination/Pagination";
import ReviewCard from "@/src/widgets/reviews/ui/ReviewCard";

import styles from "./ReviewsGrid.module.scss";

interface ReviewsGridProps {
	reviews: Review[];
}

export function ReviewsGrid({ reviews }: ReviewsGridProps) {
	const { isMobile } = useDevice();
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = isMobile ? 6 : 12;

	const totalPages = Math.ceil(reviews.length / itemsPerPage);
	const safePage = Math.min(currentPage, Math.max(totalPages, 1));

	const paginatedReviews = useMemo(() => {
		const start = (safePage - 1) * itemsPerPage;

		return reviews.slice(start, start + itemsPerPage);
	}, [reviews, safePage, itemsPerPage]);

	const sectionRef = useRef<HTMLElement>(null);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);

			sectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<section className="container block-bottom" ref={sectionRef}>
			<h1 className="page-title margin-bot">Отзывы</h1>
			<div className={styles.reviewsGrid}>
				<div className={styles.reviewsGrid__grid}>
					{paginatedReviews.length > 0 ? (
						paginatedReviews.map((review) => (
							<ReviewCard key={review.id} review={review} />
						))
					) : (
						<p>Отзывов пока нет.</p>
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
