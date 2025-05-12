import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
//! Tailwind plugin for eslint does not work for tailwind v4
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript", "next/core-web-vitals"),
	{
		rules: {
			"react/no-unescaped-entities": "off",
			"@typescript-eslint/no-unused-vars": "warn",
		},
	},
];

export default eslintConfig 