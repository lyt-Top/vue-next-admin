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
	},
};
