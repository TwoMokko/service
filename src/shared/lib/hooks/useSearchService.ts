import { useMemo, useState } from "react";

import { getServices } from "@/src/shared/data/services";
import { SearchResult } from "@/src/shared/types/types";

// Получаем данные один раз при загрузке модуля
const categories = getServices();

export function useSearchService() {
	const [searchQuery, setSearchQuery] = useState("");

	const results = useMemo<SearchResult[]>(() => {
		const query = searchQuery.trim().toLocaleLowerCase("ru");

		if (!query) return [];

		return categories.flatMap((category) => {
			const categoryResults: SearchResult[] = [];

			// Поиск по категории
			if (category.title.toLocaleLowerCase("ru").includes(query)) {
				categoryResults.push({
					title: category.title,
					href: category.href,
					type: "category",
					description: category.description,
				});
			}

			// Поиск по услугам внутри категории
			const servicesResults: SearchResult[] = category.items
				.filter((service) => service.title.toLocaleLowerCase("ru").includes(query))
				.map((service) => ({
					title: service.title,
					href: `${category.href}/${service.href}`,
					type: "service" as const,
					description: service.shortDescription || service.description,
				}));

			return [...categoryResults, ...servicesResults];
		});
	}, [searchQuery]);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const clearSearch = () => {
		setSearchQuery("");
	};

	return {
		searchQuery,
		results,
		handleSearch,
		clearSearch,
	};
}
