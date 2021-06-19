import { Local } from '/@/utils/storage';

/**
 * 全局组件大小
 * @returns 返回 `window.localStorage` 中读取的缓存值 `globalComponentSize`
 */
export const globalComponentSize: string = Local.get('themeConfig')?.globalComponentSize;
