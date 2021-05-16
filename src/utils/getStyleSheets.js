import Vue from 'vue';

// 获取阿里字体图标
const getAlicdnIconfont = () => {
	return new Promise((resolve, reject) => {
		Vue.nextTick(() => {
			const styles = document.styleSheets;
			let sheetsList = [];
			let sheetsIconList = [];
			for (let i = 0; i < styles.length; i++) {
				if (styles[i].href && styles[i].href.indexOf('at.alicdn.com') > -1) {
					sheetsList.push(styles[i]);
				}
			}
			for (let i = 0; i < sheetsList.length; i++) {
				for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
					if (sheetsList[i].cssRules[j].selectorText && sheetsList[i].cssRules[j].selectorText.indexOf('.icon-') > -1) {
						sheetsIconList.push(
							`${sheetsList[i].cssRules[j].selectorText.substring(1, sheetsList[i].cssRules[j].selectorText.length).replace(/\\:\\:before/gi, '')}`
						);
					}
				}
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList);
			else reject('未获取到值，请刷新重试');
		});
	});
};

// 初始化获取 css 样式，获取 element plus 自带图标
const getElementPlusIconfont = () => {
	return new Promise((resolve, reject) => {
		Vue.nextTick(() => {
			const styles = document.styleSheets;
			let sheetsIconList = [];
			for (let i = 0; i < styles.length; i++) {
				for (let j = 0; j < styles[i].cssRules.length; j++) {
					if (styles[i].cssRules[j].selectorText && styles[i].cssRules[j].selectorText.indexOf('.el-icon-') === 0) {
						sheetsIconList.push(
							`${styles[i].cssRules[j].selectorText.substring(1, styles[i].cssRules[j].selectorText.length).replace(/\\:\\:before/gi, '')}`
						);
					}
				}
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList);
			else reject('未获取到值，请刷新重试');
		});
	});
};

// 初始化获取 css 样式，这里使用 fontawesome 的图标
const getAwesomeIconfont = () => {
	return new Promise((resolve, reject) => {
		Vue.nextTick(() => {
			const styles = document.styleSheets;
			let sheetsList = [];
			let sheetsIconList = [];
			for (let i = 0; i < styles.length; i++) {
				if (styles[i].href && styles[i].href.indexOf('netdna.bootstrapcdn.com') > -1) {
					sheetsList.push(styles[i]);
				}
			}
			for (let i = 0; i < sheetsList.length; i++) {
				for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
					if (
						sheetsList[i].cssRules[j].selectorText &&
						sheetsList[i].cssRules[j].selectorText.indexOf('.fa-') === 0 &&
						sheetsList[i].cssRules[j].selectorText.indexOf(',') === -1
					) {
						sheetsIconList.push(
							`${sheetsList[i].cssRules[j].selectorText.substring(1, sheetsList[i].cssRules[j].selectorText.length).replace(/\\:\\:before/gi, '')}`
						);
					}
				}
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList);
			else reject('未获取到值，请刷新重试');
		});
	});
};

// 定义导出方法集合
const initIconfont = {
	// iconfont
	ali: () => {
		return getAlicdnIconfont();
	},
	// element plus
	ele: () => {
		return getElementPlusIconfont();
	},
	// fontawesome
	awe: () => {
		return getAwesomeIconfont();
	},
};

// 导出方法
export default initIconfont;
