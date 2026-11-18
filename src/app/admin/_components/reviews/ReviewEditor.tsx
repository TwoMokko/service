"use client";

import type { Review, ReviewChanges, ReviewMedia } from "@/src/shared/data/reviews/types";

import styles from "../../admin.module.scss";

interface ReviewEditorProps {
	review: Review;
	onUpdate: (id: number, changes: ReviewChanges) => void;
	onDelete: (id: number) => void;
	onChangeType: (id: number, type: Review["type"]) => void;
	onChangeMedia: (id: number, media: ReviewMedia[]) => void;
}

export default function ReviewEditor({
	review,
	onUpdate,
	onDelete,
	onChangeType,
	onChangeMedia,
}: ReviewEditorProps) {
	return (
		<div className={styles.serviceCard}>
			<div className={styles.serviceHeader}>
				<h3 className={styles.serviceTitle}>Отзыв #{review.id}</h3>

				<button
					type="button"
					onClick={() => onDelete(review.id)}
					className={`${styles.btn} ${styles.btnDelete}`}
				>
					Удалить
				</button>
			</div>

			<div className={styles.serviceFields}>
				<label className={styles.label}>
					Тип отзыва
					<select
						className={styles.input}
						value={review.type}
						onChange={(event) =>
							onChangeType(review.id, event.target.value as Review["type"])
						}
					>
						<option value="text">Текст</option>
						<option value="photo">Фото</option>
						<option value="video">Видео</option>
						<option value="text-photo">Текст + фото</option>
						<option value="text-video">Текст + видео</option>
					</select>
				</label>
				<label className={styles.label}>
					Имя автора
					<input
						className={styles.input}
						value={review.author.name}
						onChange={(event) =>
							onUpdate(review.id, {
								author: {
									...review.author,
									name: event.target.value,
								},
							})
						}
					/>
				</label>

				<label className={styles.label}>
					Дата
					<input
						type="text"
						className={styles.input}
						value={review.author.date}
						onChange={(event) =>
							onUpdate(review.id, {
								author: {
									...review.author,
									date: event.target.value,
								},
							})
						}
					/>
				</label>
				<label className={styles.label}>
					Путь к аватару
					<input
						className={styles.input}
						value={review.author.avatarSrc ?? ""}
						placeholder="/images/reviews/avatar.webp"
						onChange={(event) =>
							onUpdate(review.id, {
								author: {
									...review.author,
									avatarSrc: event.target.value || null,
								},
							})
						}
					/>
				</label>
				<label className={styles.label}>
					Ссылка на оригинал отзыва
					<input
						type="url"
						className={styles.input}
						value={review.link ?? ""}
						placeholder="https://..."
						onChange={(event) =>
							onUpdate(review.id, {
								link: event.target.value,
							})
						}
					/>
				</label>

				<label className={styles.label}>
					Рейтинг
					<input
						type="number"
						min={1}
						max={5}
						className={styles.inputNumber}
						value={review.rating}
						onChange={(event) =>
							onUpdate(review.id, {
								rating: Number(event.target.value),
							})
						}
					/>
				</label>

				{review.type !== "photo" && review.type !== "video" && (
					<label className={styles.label}>
						Текст отзыва
						<textarea
							className={styles.textarea}
							value={review.text}
							onChange={(event) =>
								onUpdate(review.id, {
									text: event.target.value,
								})
							}
						/>
					</label>
				)}
				{(review.type === "photo" || review.type === "text-photo") && (
					<div className={styles.serviceFull}>
						<h4>Фотографии</h4>

						{review.media.map((photo, index) => (
							<div className={styles.innerItem} key={index}>
								<label className={styles.label}>
									Путь к фотографии
									<input
										className={styles.input}
										value={photo.src}
										onChange={(event) => {
											const media = review.media.map((item, i) =>
												i === index
													? { ...item, src: event.target.value }
													: item,
											);

											onChangeMedia(review.id, media);
										}}
									/>
								</label>

								<label className={styles.label}>
									Описание (alt)
									<input
										className={styles.input}
										value={photo.alt ?? ""}
										onChange={(event) => {
											const media = review.media.map((item, i) =>
												i === index
													? { ...item, alt: event.target.value }
													: item,
											);

											onChangeMedia(review.id, media);
										}}
									/>
								</label>

								<button
									type="button"
									className={`${styles.btn} ${styles.btnRemoveItem}`}
									onClick={() =>
										onChangeMedia(
											review.id,
											review.media.filter((_, i) => i !== index),
										)
									}
								>
									Удалить фотографию
								</button>
							</div>
						))}

						<button
							type="button"
							className={`${styles.btn} ${styles.btnAddItem}`}
							onClick={() =>
								onChangeMedia(review.id, [
									...review.media,
									{ type: "photo", src: "", alt: "" },
								])
							}
						>
							+ Добавить фотографию
						</button>
					</div>
				)}
				{(review.type === "video" || review.type === "text-video") && (
					<div className={styles.serviceFull}>
						<h4>Видео</h4>

						{review.media.map((video, index) => (
							<div className={styles.innerItem} key={index}>
								<label className={styles.label}>
									Путь к видео
									<input
										className={styles.input}
										value={video.src}
										onChange={(event) => {
											const media = review.media.map((item, i) =>
												i === index
													? { ...item, src: event.target.value }
													: item,
											);

											onChangeMedia(review.id, media);
										}}
									/>
								</label>

								<label className={styles.label}>
									Путь к обложке (poster)
									<input
										className={styles.input}
										value={video.poster}
										onChange={(event) => {
											const media = review.media.map((item, i) =>
												i === index
													? { ...item, poster: event.target.value }
													: item,
											);

											onChangeMedia(review.id, media);
										}}
									/>
								</label>

								<label className={styles.label}>
									Описание (alt)
									<input
										className={styles.input}
										value={video.alt ?? ""}
										onChange={(event) => {
											const media = review.media.map((item, i) =>
												i === index
													? { ...item, alt: event.target.value }
													: item,
											);

											onChangeMedia(review.id, media);
										}}
									/>
								</label>
							</div>
						))}

						{review.media.length === 0 && (
							<button
								type="button"
								className={`${styles.btn} ${styles.btnAddItem}`}
								onClick={() =>
									onChangeMedia(review.id, [
										{
											type: "video",
											src: "",
											poster: "",
											alt: "",
										},
									])
								}
							>
								+ Добавить видео
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
