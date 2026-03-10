export const customSelectStyles = {
	control: (base: any, state: any) => ({
		...base,
		border: "1px solid #959393",
		borderRadius: "0",
		borderColor: "#959393",
		boxShadow: "none",
		backgroundColor: "#ffffff",
		minHeight: "48px",
		fontSize: "16px",
		cursor: "pointer",
		transition: "all 0.2s ease",
		"&:hover": {
			borderColor: "#959393",
		},
	}),
	placeholder: (base: any) => ({
		...base,
		color: "#959393",
		fontSize: "16px",
	}),
	input: (base: any) => ({
		...base,
		color: "#959393",
		fontSize: "16px",
	}),
	dropdownIndicator: (base: any, state: any) => ({
		...base,
		color: "#959393",
		transition: "color 0.2s ease",
		"&:hover": {
			color: "#959393",
		},
	}),
	clearIndicator: (base: any) => ({
		...base,
		color: "#959393",
		"&:hover": {
			color: "#ef4444",
		},
	}),
	indicatorSeparator: (base: any, state: any) => ({
		...base,
		backgroundColor: "transparent",
	}),
	menu: (base: any) => ({
		...base,
		borderRadius: "0",
		border: "1px solid #959393",
		boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
		overflow: "hidden",
		zIndex: 3,
	}),
	option: (base: any, state: any) => ({
		...base,
		backgroundColor: state.isSelected ? "#FAFAFA" : state.isFocused ? "#FAFAFA" : "#ffffff",
		color: state.isSelected ? "#E73843" : "#959393",
		fontSize: "16px",
		cursor: "pointer",
		padding: "12px 16px",
		"&:active": {
			backgroundColor: "#FAFAFA",
		},
	}),
	singleValue: (base: any) => ({
		...base,
		color: "#1f2937",
		fontSize: "16px",
	}),
};
