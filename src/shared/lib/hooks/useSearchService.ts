import { useState } from "react";

import { SearchResult } from "@/src/shared/types/types";

export function useSearchService() {
	const [searchQuery, setSearchQuery] = useState("");
	// добавть debounce можно

	const searchResult = () => {
		if (!searchQuery.trim()) return [];

		const query = searchQuery.toLowerCase().trim();
		const results: SearchResult[] = [];

		// получить все категории
		// поиск по категорям и title при совадении пушим в результат (category.title.toLowerCase().includes(query))
		// прямо в цикле с категориями ищем подкатегории getServicesByCategory и тоже пушим

		return results;
	};

	const handleSearch = (query: string) => setSearchQuery(query);
	const clearSearch = () => setSearchQuery("");

	return {
		searchQuery,
		searchResult,
		handleSearch,
		clearSearch,
		hasResults: searchResult.length > 0,
	};
}
