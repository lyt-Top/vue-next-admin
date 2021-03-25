import { nextTick } from 'vue';

// 定义方法
export const NextLoading = {
	// 创建 loading
	start: () => {
		const body: any = document.body;
		const div = document.createElement('div');
		div.setAttribute('class', 'loading-next');
		const html = `<div class="loading-next-box"><div class="loading-next-animation"><div class="loading-next-animation-box"><div></div><div></div></div></div></div>`;
		div.innerHTML = html;
		body.insertBefore(div, body.childNodes[0]);
	},
	// 移除 loading
	done: () => {
		nextTick(() => {
			setTimeout(() => {
				const el = document.querySelector('.loading-next');
				el && el.parentNode?.removeChild(el);
			}, 1000);
		});
	},
};
