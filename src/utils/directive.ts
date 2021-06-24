import type { App } from 'vue';
import { authDirective } from '/@/utils/authDirective';
import { wavesDirective, dragDirective } from '/@/utils/customDirective';

/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 * @methods wavesDirective 按钮波浪指令，用法：v-waves
 * @methods dragDirective 自定义拖动指令，用法：v-drag
 */
export function directive(app: App) {
	// 用户权限指令
	authDirective(app);
	// 按钮波浪指令
	wavesDirective(app);
	// 自定义拖动指令
	dragDirective(app);
}
