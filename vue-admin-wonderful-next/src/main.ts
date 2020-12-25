import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '/@/theme/index.scss'
import { locale } from 'element-plus'

createApp(App).use(router).use(ElementPlus, { locale }).mount('#app')

