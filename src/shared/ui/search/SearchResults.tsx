import Link from "next/link";

import { SearchResult } from "@/src/shared/types/types";

interface SearchResultsProps {
	results: SearchResult[];
	onClose: () => void;
	onSelect: () => void;
}

export default function SearchResults({ results, onClose, onSelect }: SearchResultsProps) {
	// можно добавить выделение совпадающего текста в результатах
	if (results.length === 0) return <div>не найдено</div>;

	return (
		<div>
			{results.map(res => (
				<Link
					key={`${res.type}-${res.href}`}
					href={res.href}
					onClick={() => {
						onSelect();
						onClose();
					}}
				>
					{res.title}
				</Link>
			))}
		</div>
	);
}
