/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-29 14:21:31
 * @LastEditors: hy
 * @LastEditTime: 2021-11-29 14:26:48
 */
import type { App } from "vue"

/* 基础组件 */
import Card from "./Card"

const components: any[] = [
  Card
]
// 需要添加到 VUE 实例的 API
// const API = { Toast, MessageBox };

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
 const install = (app: App) => {
  // 注册组件
  components.forEach(component => app.component(component.name, component));
  // 插入 API
  // Object.keys(API).forEach(key => {
  //   app.config.globalProperties[`$${key}`] = (API as any)[key];
  // });
}

export {
  Card
}

// 全部导出
export default {
  install,
  ...components
};