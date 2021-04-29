import { getLocal } from '@/utils/storage.js';

// 全局组件大小
export const globalComponentSize = getLocal('themeConfig') ? getLocal('themeConfig').globalComponentSize : 'default';
