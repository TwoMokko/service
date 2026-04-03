"use client";

import React from "react";

import styles from "./Input.module.scss";

interface InputProps {
	inputName: string;
	placeholder: string;
	value: string;
	required?: boolean | undefined;
	minWidth?: number | string;
	type?: string | undefined;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

export function Input({
	inputName,
	placeholder,
	value,
	minWidth,
	required = false,
	type = "text",
	handleChange,
	className,
}: InputProps) {
	const inputClass = `${styles.input} ${className ? className : ""}`;

	return (
		<input
			type={type}
			name={inputName}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			required={required}
			className={inputClass}
			data-min-width={minWidth}
		/>
	);
}
