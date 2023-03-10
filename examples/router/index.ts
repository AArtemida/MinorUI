/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-25 11:54:06
 * @LastEditors: hy
 * @LastEditTime: 2021-11-30 16:20:59
 */
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import routePages from 'virtual:generated-pages'

let docs : Array<RouteRecordRaw> = routePages.filter((r : RouteRecordRaw) => {
  return r.path && r.path.includes('doc/')
}).map((r : RouteRecordRaw) => {
  let o = Object.assign({}, r)
  o.path = o.path.replace('/doc', '')
  return o
})
let pages : Array<RouteRecordRaw> = []
routePages.forEach((r : any) => {
  if(r.path && !r.path.includes('doc/')) {
    if(r.path === '/doc') {
      r.children = docs
    }
    pages.push(r)
  }
})
const routes: Array<RouteRecordRaw> = [
  /*{
    path: '',
    redirect: (_) => {
      return { path: '/home' }
    },
  },
  {
    path: '/button',
    name: 'button',
    component: async () => import('../docs/Button.md')
  },*/
  ...pages,
  {
    path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
    redirect: (_) => {
      return { path: '/404' }
    },
  },
]

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