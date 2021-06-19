import { nextTick } from 'vue';
import loadingCss from '/@/theme/loading.scss';

/**
 * 页面全局 Loading
 * @method setCss 载入 css
 * @method start 创建 loading
 * @method done 移除 loading
 */
export const NextLoading = {
	// 载入 css
	setCss: () => {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = loadingCss;
		link.crossOrigin = 'anonymous';
		document.getElementsByTagName('head')[0].appendChild(link);
	},
	// 创建 loading
	start: () => {
		const bodys: Element = document.body;
		const div = document.createElement('div');
		div.setAttribute('class', 'loading-next');
		const htmls = `
			<div class="loading-next-box">
			<div class="loading-next-box-warp">
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
				<div class="loading-next-box-item"></div>
			</div>
		</div>
		`;
		div.innerHTML = htmls;
		bodys.insertBefore(div, bodys.childNodes[0]);
		window.nextLoading = true;
	},
	// 移除 loading
	done: () => {
		nextTick(() => {
			setTimeout(() => {
				window.nextLoading = false;
				const el = document.querySelector('.loading-next');
				el && el.parentNode?.removeChild(el);
			}, 1000);
		});
	},
};
