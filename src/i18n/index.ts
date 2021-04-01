import { createI18n } from 'vue-i18n';
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from 'element-plus/lib/locale/lang/en';
import zhtwLocale from 'element-plus/lib/locale/lang/zh-tw';
import { store } from '/@/store/index.ts';

import nextZhcn from '/@/i18n/lang/zh-cn.ts';
import nextEn from '/@/i18n/lang/en.ts';
import nextZhtw from '/@/i18n/lang/zh-tw.ts';

import pagesHomeZhcn from '/@/i18n/pages/home/zh-cn.ts';
import pagesHomeEn from '/@/i18n/pages/home/en.ts';
import pagesHomeZhtw from '/@/i18n/pages/home/zh-tw.ts';
import pagesLoginZhcn from '/@/i18n/pages/login/zh-cn.ts';
import pagesLoginEn from '/@/i18n/pages/login/en.ts';
import pagesLoginZhtw from '/@/i18n/pages/login/zh-tw.ts';

// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
const messages = {
	[zhcnLocale.name]: {
		el: zhcnLocale.el,
		message: {
			...nextZhcn,
			...pagesHomeZhcn,
			...pagesLoginZhcn,
		},
	},
	[enLocale.name]: {
		el: enLocale.el,
		message: {
			...nextEn,
			...pagesHomeEn,
			...pagesLoginEn,
		},
	},
	[zhtwLocale.name]: {
		el: zhtwLocale.el,
		message: {
			...nextZhtw,
			...pagesHomeZhtw,
			...pagesLoginZhtw,
		},
	},
};

// 导出语言国际化
export const i18n = createI18n({
	locale: store.state.themeConfig.themeConfig.globalI18n,
	fallbackLocale: zhcnLocale.name,
	messages,
});
