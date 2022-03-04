import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { directive } from '/@/utils/directive';
import other from '/@/utils/other';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
import mitt from 'mitt';

const app = createApp(App);

directive(app);
other.elSvg(app);

app.use(router).use(store, key).use(ElementPlus).mount('#app');

app.config.globalProperties.mittBus = mitt();
