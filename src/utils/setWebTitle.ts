import { nextTick } from 'vue';
import router from '/@/router/index';
import { store } from '/@/store/index';

/**
 * 设置浏览器标题
 */
export function useTitle() {
	return () => {
		nextTick(() => {
			let webTitle = '';
			let globalTitle: string = store.state.themeConfig.themeConfig.globalTitle;
			webTitle = router.currentRoute.value.meta.title as any;
			document.title = `${webTitle} - ${globalTitle}` || globalTitle;
		});
	};
}
