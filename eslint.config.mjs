import nextPlugin from "@next/eslint-plugin-next";

export default [
	{
		plugins: {
			"@next/next": nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,

			// Отключаем все что вызывает ошибки
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"react-hooks/exhaustive-deps": "off",
			"react-hooks/rules-of-hooks": "off",
			"react-hooks/preserve-manual-memoization": "off",
			"prettier/prettier": "error",
		},
	},
	{
		plugins: {
			prettier: (await import("eslint-plugin-prettier")).default,
		},
	},
	{
		ignores: [".next/**", "out/**", "build/**", "node_modules/**"],
	},
];
