import { useState, useEffect } from "react";
import { getServicesAsync } from "@/src/shared/data/services";
import { SearchResult } from "@/src/shared/types/types";

export function useSearchService() {
	const [searchQuery, setSearchQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setResults([]);
			return;
		}

		const query = searchQuery.toLowerCase().trim();

		getServicesAsync().then(categories => {
			const searchResults: SearchResult[] = categories.flatMap((category) => {
				const categoryResults = [];

				if (category.title.toLowerCase().includes(query)) {
					categoryResults.push({
						title: category.title,
						href: category.href,
						type: "category" as const,
						description: category.description,
					});
				}

				const servicesResults = category.items
					.filter((service) => service.title.toLowerCase().includes(query))
					.map((service) => ({
						title: service.title,
						href: `${category.href}/${service.href}`,
						type: "service" as const,
						description: service.shortDescription || service.description,
					}));

				return [...categoryResults, ...servicesResults];
			});

			setResults(searchResults);
		}).catch(() => {
			console.error('Ошибка загрузки данных для поиска');
		});
	}, [searchQuery]);

	const handleSearch = (query: string) => setSearchQuery(query);
	const clearSearch = () => {
		setSearchQuery("");
		setResults([]);
	};

	return {
		searchQuery,
		results,
		handleSearch,
		clearSearch,
	};
}