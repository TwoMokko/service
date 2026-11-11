"use client";

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

import styles from "./MultiSelectFilter.module.scss";

const ALL_TAG = "Все";

interface MultiSelectFilterProps {
	title: string;
	options: string[];
	selectedOptions: string[];
	getResultCount: (selected: string[]) => number;
	onApply: (options: string[]) => void;
	onClose: () => void;
}

export function MultiSelectFilter({
	title,
	options,
	selectedOptions,
	getResultCount,
	onApply,
	onClose,
}: MultiSelectFilterProps) {
	const [draftTags, setDraftTags] = useState(selectedOptions);

	const toggleTag = (tag: string) => {
		if (tag === ALL_TAG) {
			setDraftTags([ALL_TAG]);
			return;
		}

		const current = draftTags.filter((item) => item !== ALL_TAG);

		const updated = current.includes(tag)
			? current.filter((item) => item !== tag)
			: [...current, tag];

		setDraftTags(updated.length ? updated : [ALL_TAG]);
	};

	const resultCount = getResultCount(draftTags);

	const displayCount = resultCount > 10 ? "10+" : resultCount;

	return (
		<div className={styles.mobileTagSelector}>
			<h3 className={styles.tagTitle}>{title}</h3>

			<div className={styles.tagContent}>
				<div className={styles.tagList}>
					{options.map((tag) => {
						const isSelected = draftTags.includes(tag);

						return (
							<button
								key={tag}
								type="button"
								aria-pressed={isSelected}
								className={`${styles.tagItem} ${isSelected ? styles.checked : ""}`}
								onClick={() => toggleTag(tag)}
							>
								<span>{tag}</span>

								<span className={styles.checkbox}>
									{isSelected && <FaCheck size={12} color="#F84F0C" />}
								</span>
							</button>
						);
					})}
				</div>

				<button
					type="button"
					className={styles.closeBtn}
					onClick={() => onApply(draftTags)}
				>
					Показать {displayCount} результатов
				</button>
			</div>
		</div>
	);
}
