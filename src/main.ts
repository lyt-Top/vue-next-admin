import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import { authDirective } from '/@/utils/authDirective.ts'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '/@/theme/index.scss'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import mitt from "mitt"

const app = createApp(App)
app.use(router).use(store, key).use(ElementPlus, { locale: lang }).mount('#app')
app.config.globalProperties.mittBus = mitt()

authDirective(app)
