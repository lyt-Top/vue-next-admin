module.exports = {
	root: true,
	env: {
		node: true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	plugins: ['vue'],
	extends: ['plugin:vue/essential', 'eslint:recommended'],
	rules: {
		// http://eslint.cn/docs/rules/
		'vue/no-parsing-error': 'off',
		'no-unused-vars': 'error',
		'no-dupe-args': 'error',
		'no-empty': 'off',
		'no-extra-semi': 'off',
		'no-constant-condition': 'off',
		'no-console': 'error',
		'vue/multi-word-component-names': 'off',
	},
};
