import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus';
import '/@assets/style/base/index.scss';
// import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
