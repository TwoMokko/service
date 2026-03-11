import nextPlugin from "@next/eslint-plugin-next";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
	// Next.js уже включает TypeScript правила!
	{
		plugins: {
			"@next/next": nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,
			"prettier/prettier": ["error", {}, { usePrettierrc: true }],
		},
	},

	eslintPluginPrettierRecommended,

	{
		ignores: [".next/**", "out/**", "build/**", "node_modules/**"],
	},
];
