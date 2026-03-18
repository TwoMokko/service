import { useState } from "react";

import { getAllCategories, getServicesByCategory } from "@/src/shared/data/services";
import { SearchResult } from "@/src/shared/types/types";

export function useSearchService() {
	const [searchQuery, setSearchQuery] = useState("");
	// добавть debounce можно

	const query = searchQuery.toLowerCase().trim();
	const categories = getAllCategories();
	const results: SearchResult[] = categories.flatMap((category) => {
		const categoryResults = [];

		if (category.title.toLowerCase().includes(query)) {
			categoryResults.push({
				title: category.title,
				href: category.href,
				type: "category" as const,
			});
		}

		const services = getServicesByCategory(category.href);
		const servicesResults = services
			.filter((service) => service.title.toLowerCase().includes(query))
			.map((service) => ({
				title: service.title,
				href: service.slug,
				type: "service" as const,
			}));

		return [...categoryResults, ...servicesResults];
	});

	const handleSearch = (query: string) => setSearchQuery(query);
	const clearSearch = () => setSearchQuery("");

	return {
		searchQuery,
		results,
		handleSearch,
		clearSearch,
	};
}
