"use client";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { useSearchService } from "@/src/shared/lib/hooks/useSearchService";

import SearchResults from "./SearchResults";

import styles from "./SearchResults.module.scss";

interface SearchAndResultsProps {
	variant?: "desktop" | "mobile";
	onNavigate?: () => void;
	onFocus?: () => void;
}

export default function SearchAndResults({
	variant = "desktop",
	onNavigate,
	onFocus,
}: SearchAndResultsProps) {
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
		<div className={`${styles.searchWrap} ${styles[variant]}`} ref={searchWrapRef}>
			<div className={styles.inputWrap}>
				<span className={styles.icon} onClick={onFocus}>
					<FiSearch />
				</span>
				<input
					onFocus={onFocus}
					type="text"
					value={searchQuery}
					onClick={() => setIsOpen(true)}
					onChange={(e) => {
						handleSearch(e.target.value);
						e.target.value.trim() ? setIsOpen(true) : setIsOpen(false);
					}}
					placeholder="Поиск по названию услуги..."
				/>
				{searchQuery && (
					<button
						type="button"
						className={styles.inputClear}
						aria-label="Очистить поиск"
						onClick={() => {
							setIsOpen(false);
							clearSearch();
						}}
					>
						<IoClose size={16} />
					</button>
				)}
			</div>
			{isOpen && (
				<SearchResults
					variant={variant}
					results={results}
					searchQuery={searchQuery}
					onSearch={handleSearch}
					onClose={() => setIsOpen(false)}
					onSelect={() => {
						setIsOpen(false);
						clearSearch();
						onNavigate?.();
					}}
				/>
			)}
		</div>
	);
}
