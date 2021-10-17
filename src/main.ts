import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { directive } from '/@/utils/directive';
import { globalComponentSize } from '/@/utils/componentSize';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
import mitt from 'mitt';

const app = createApp(App);
app.use(router).use(store, key).use(ElementPlus, { size: globalComponentSize }).mount('#app');

app.config.globalProperties.mittBus = mitt();

directive(app);
