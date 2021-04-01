import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { authDirective } from '/@/utils/authDirective.ts';
import { i18n } from '/@/i18n/index.ts';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '/@/theme/index.scss';
import mitt from 'mitt';

const app = createApp(App);
app.use(router).use(store, key).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).mount('#app');
app.config.globalProperties.mittBus = mitt();

authDirective(app);
