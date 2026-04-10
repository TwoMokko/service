import React from "react";
import { FiSearch } from "react-icons/fi";
import { LuArrowUpRight } from "react-icons/lu";

import Link from "next/link";

import { SearchResult } from "@/src/shared/types/types";

import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
	results: SearchResult[];
	searchQuery: string;
	onSearch: (query: string) => void;
	onClose: () => void;
	onSelect: () => void;
}

export default function SearchResults({
	results,
	searchQuery,
	onSearch,
	onClose,
	onSelect,
}: SearchResultsProps) {
	// if (results.length === 0) return <div className={styles.searchResults}>не найдено</div>;

	return (
		<div className={styles.searchResults}>
			<div className={styles.searchResults__inputWrap}>
				<FiSearch size={24} />
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => onSearch(e.target.value)}
					placeholder="Поиск внутри результатов..."
					autoFocus
				/>
			</div>
			{searchQuery && (
				<div className={styles.resultsContent}>
					<div className={styles.resultsTop}>{results.length} результатов поиска</div>
					<div className={styles.resultsList}>
						{results.map((res) => (
							<Link
								key={`${res.type}-${res.href}`}
								href={`/services/${res.href}`}
								onClick={() => {
									onSelect();
									onClose();
								}}
								className={styles.resultsItem}
							>
								<p className={styles.resultsItem__title}>{res.title}</p>
								<p className={styles.resultsItem__link}>https//{res.href}</p>
								<p className={styles.resultsItem__description}>{res.description}</p>
								<div className={styles.resultsItem__arrow}>
									<LuArrowUpRight size={22} />
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
