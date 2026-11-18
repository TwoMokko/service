"use client";

import { useEffect, useState } from "react";

import type {
	Review,
	ReviewChanges,
	ReviewMedia,
	ReviewPhoto,
	ReviewVideo,
	ReviewsData,
} from "@/src/shared/data/reviews/types";

import ReviewEditor from "./ReviewEditor";

import styles from "../../admin.module.scss";

type ReviewDraft = {
	text: string;
	photos: ReviewPhoto[];
	videos: ReviewVideo[];
};

export default function ReviewsEditor() {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState("");
	const [reviewDrafts, setReviewDrafts] = useState<Record<number, ReviewDraft>>({});

	// Загружаем отзывы при открытии редактора
	useEffect(() => {
		const loadReviews = async () => {
			try {
				const response = await fetch("/api/admin/reviews");

				if (!response.ok) {
					throw new Error("Не удалось загрузить отзывы");
				}

				const data: ReviewsData = await response.json();

				setReviews(data.reviews);
			} catch (error) {
				console.error(error);
				setMessage("Ошибка загрузки отзывов");
			} finally {
				setLoading(false);
			}
		};

		loadReviews();
	}, []);

	// Сохраняем отзывы
	const handleSave = async () => {
		setSaving(true);
		setMessage("");

		try {
			const response = await fetch("/api/admin/reviews", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ reviews }),
			});

			if (!response.ok) {
				throw new Error("Не удалось сохранить отзывы");
			}

			setMessage("Сохранено!");
		} catch (error) {
			console.error(error);
			setMessage("Ошибка сохранения отзывов");
		} finally {
			setSaving(false);
		}
	};

	const handleAddReview = () => {
		const newReview: Review = {
			id: Date.now(),
			type: "text",
			author: {
				name: "",
				date: "",
			},
			rating: 5,
			text: "",
		};

		setReviews((prev) => [...prev, newReview]);
	};

	const getReviewDraft = (review: Review): ReviewDraft => {
		const existingDraft = reviewDrafts[review.id];

		if (existingDraft) {
			return existingDraft;
		}

		return {
			text: "text" in review ? (review.text ?? "") : "",
			photos: review.type === "photo" || review.type === "text-photo" ? review.media : [],
			videos: review.type === "video" || review.type === "text-video" ? review.media : [],
		};
	};

	const handleUpdateReview = (id: number, changes: ReviewChanges) => {
		setReviews((prev) =>
			prev.map((review): Review => {
				if (review.id !== id) {
					return review;
				}

				if (changes.text !== undefined) {
					setReviewDrafts((prevDrafts) => ({
						...prevDrafts,
						[id]: {
							...getReviewDraft(review),
							text: changes.text!,
						},
					}));
				}

				// У фото- и видеоотзывов без текста нельзя редактировать text
				if (
					(review.type === "photo" || review.type === "video") &&
					changes.text !== undefined
				) {
					return review;
				}

				return {
					...review,
					...changes,
				} as Review;
			}),
		);
	};

	const handleDeleteReview = (id: number) => {
		setReviews((prev) => prev.filter((review) => review.id !== id));
	};

	const handleChangeReviewType = (id: number, type: Review["type"]) => {
		setReviews((prev) =>
			prev.map((review): Review => {
				if (review.id !== id) return review;

				const draft = getReviewDraft(review);

				setReviewDrafts((prevDrafts) => ({
					...prevDrafts,
					[id]: draft,
				}));

				const base = {
					id: review.id,
					author: review.author,
					rating: review.rating,
					link: review.link,
				};

				switch (type) {
					case "text":
						return {
							...base,
							type: "text",
							text: draft.text,
						};

					case "photo":
						return {
							...base,
							type: "photo",
							media: draft.photos,
						};

					case "video":
						return {
							...base,
							type: "video",
							media: draft.videos,
						};

					case "text-photo":
						return {
							...base,
							type: "text-photo",
							text: draft.text,
							media: draft.photos,
						};

					case "text-video":
						return {
							...base,
							type: "text-video",
							text: draft.text,
							media: draft.videos,
						};
				}
			}),
		);
	};

	const handleChangeReviewMedia = (id: number, media: ReviewMedia[]) => {
		setReviews((prev) =>
			prev.map((review): Review => {
				if (review.id !== id) return review;

				if (review.type === "photo" || review.type === "text-photo") {
					const photos = media.filter(
						(item): item is ReviewPhoto => item.type === "photo",
					);

					setReviewDrafts((prevDrafts) => ({
						...prevDrafts,
						[id]: {
							...getReviewDraft(review),
							photos,
						},
					}));

					return { ...review, media: photos };
				}

				if (review.type === "video" || review.type === "text-video") {
					const videos = media.filter(
						(item): item is ReviewVideo => item.type === "video",
					);

					setReviewDrafts((prevDrafts) => ({
						...prevDrafts,
						[id]: {
							...getReviewDraft(review),
							videos,
						},
					}));

					return { ...review, media: videos };
				}

				return review;
			}),
		);
	};

	if (loading) {
		return <div className={styles.loading}>Загрузка отзывов...</div>;
	}

	return (
		<>
			<div className={styles.headerButtons}>
				<button
					type="button"
					onClick={handleSave}
					disabled={saving}
					className={`${styles.btn} ${styles.btnSave}`}
				>
					{saving ? "Сохранение..." : "Сохранить всё с отзывами"}
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
					<h2>Отзывы ({reviews.length})</h2>
					<button
						type="button"
						onClick={handleAddReview}
						className={`${styles.btn} ${styles.btnAdd}`}
					>
						+ Добавить отзыв
					</button>
				</div>

				{reviews.length === 0 ? (
					<p>Пока отзывов нет.</p>
				) : (
					reviews.map((review) => (
						<ReviewEditor
							key={review.id}
							review={review}
							onUpdate={handleUpdateReview}
							onDelete={handleDeleteReview}
							onChangeType={handleChangeReviewType}
							onChangeMedia={handleChangeReviewMedia}
						/>
					))
				)}
			</section>
		</>
	);
}
