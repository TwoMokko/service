import { useState } from "react";

import { useSearchService } from "@/src/shared/lib/hooks/useSearchService";
import SearchResults from "@/src/shared/ui/search/SearchResults";

export default function ServiceSearchAndResults() {
	const { searchQuery, searchResult, handleSearch, clearSearch } = useSearchService();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div>
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => {
					handleSearch(e.target.value);
					e.target.value.trim() ? setIsOpen(true) : setIsOpen(false);
				}}
				placeholder="введите что ищите"
				style={{ width: "100%" }}
			/>

			{isOpen && searchQuery && (
				<SearchResults
					results={searchResult}
					onClose={() => setIsOpen(false)}
					onSelect={() => {
						setIsOpen(false);
						clearSearch();
					}}
				/>
			)}
		</div>
	);
}
