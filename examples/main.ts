/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-25 11:45:07
 * @LastEditors: moon
 * @LastEditTime: 2021-11-25 16:06:53
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vite-plugin-vuedoc/style.css'

const app = createApp(App)

// 挂载vuex状态管理
app.use(router)

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))