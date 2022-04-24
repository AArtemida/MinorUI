/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-25 11:45:07
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 17:15:46
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/common.scss'
import MinorUi from "~/index";
import 'vite-plugin-vuedoc/style.css'

const app = createApp(App)

// 挂载vuex状态管理
app.use(MinorUi).use(router)

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))