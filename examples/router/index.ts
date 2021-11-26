/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-25 11:54:06
 * @LastEditors: moon
 * @LastEditTime: 2021-11-26 15:36:05
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'
// import HelloWorld from '../components/HelloWorld.vue'
// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '',
//     redirect: (_) => {
//       return { path: '/home' }
//     },
//   },
//   {
//     path: '/home',
//     name: 'HelloWorld',
//     component: HelloWorld,
//   },
//   {
//     path: '/button',
//     name: 'button',
//     component: async () => import('../docs/Button.md')
//   },
//   {
//     path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
//     redirect: (_) => {
//       return { path: '/404' }
//     },
//   },
// ]
console.log(routes)
const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})
export default router