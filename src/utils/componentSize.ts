import { getLocal } from '/@/utils/storage.ts';

// 全局组件大小
export const globalComponentSize = getLocal('themeConfig')?.globalComponentSize;
