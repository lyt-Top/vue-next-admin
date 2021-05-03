import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { authDirective } from '/@/utils/authDirective';
import { i18n } from '/@/i18n/index';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '/@/theme/index.scss';
import mitt from 'mitt';
import screenShort from 'vue-web-screen-shot';

const app = createApp(App);
app.use(router).use(store, key).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(screenShort, { enableWebRtc: false }).mount('#app');
app.config.globalProperties.mittBus = mitt();

authDirective(app);
