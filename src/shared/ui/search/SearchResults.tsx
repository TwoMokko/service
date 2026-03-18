import Link from "next/link";

import { SearchResult } from "@/src/shared/types/types";

import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
	results: SearchResult[];
	onClose: () => void;
	onSelect: () => void;
}

export default function SearchResults({ results, onClose, onSelect }: SearchResultsProps) {
	if (results.length === 0) return <div className={styles.searchResults}>не найдено</div>;

	return (
		<div className={styles.searchResults}>
			<div className={styles.resultsTop}>{results.length} результатов поиска</div>
			<div className={styles.resultsContent}>
				{results.map((res) => (
					<Link
						key={`${res.type}-${res.href}`}
						href={res.href}
						onClick={() => {
							onSelect();
							onClose();
						}}
						className={styles.resultsItem}
					>
						<div>{res.title}</div>
						<div className={styles.resultsItemLink}>https//{res.href}</div>
					</Link>
				))}
			</div>
		</div>
	);
}
