/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-25 17:33:05
 * @LastEditors: moon
 * @LastEditTime: 2021-11-26 11:24:13
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}