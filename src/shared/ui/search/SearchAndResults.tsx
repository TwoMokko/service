import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { useSearchService } from "@/src/shared/lib/hooks/useSearchService";

import SearchResults from "./SearchResults";

import styles from "./SearchResults.module.scss";

export default function SearchAndResults() {
	const { searchQuery, results, handleSearch, clearSearch } = useSearchService();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const searchWrapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchWrapRef.current && !searchWrapRef.current.contains(event.target as Node))
				setIsOpen(false);
		};

		document.addEventListener("pointerdown", handleClickOutside);
		return () => document.removeEventListener("pointerdown", handleClickOutside);
	}, []);

	return (
		<div className={styles.searchWrap} ref={searchWrapRef}>
			<div className={styles.inputWrap}>
				<FiSearch />
				<input
					type="text"
					value={searchQuery}
					onClick={() => setIsOpen(true)}
					onChange={(e) => {
						handleSearch(e.target.value);
						e.target.value.trim() ? setIsOpen(true) : setIsOpen(false);
					}}
					placeholder="Поиск по названию услуги..."
				/>
				<div
					className={styles.inputClear}
					onClick={() => {
						setIsOpen(false);
						clearSearch();
					}}
				>
					<IoClose size={16} />
				</div>
			</div>
			{isOpen && searchQuery && (
				<SearchResults
					results={results}
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
