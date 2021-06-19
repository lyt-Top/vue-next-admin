module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier/@typescript-eslint'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		// http://eslint.cn/docs/rules/
		// https://eslint.vuejs.org/rules/
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'vue/no-setup-props-destructure': 'off',
		'no-prototype-builtins': 'off',
		'no-console': 'error',
	},
};
