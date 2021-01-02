import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '/@/theme/index.scss'
import lang from 'element-plus/lib/locale/lang/zh-cn'

createApp(App).use(router).use(ElementPlus, { locale: lang }).mount('#app')