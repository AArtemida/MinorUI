/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-29 14:21:31
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 17:39:17
 */
import type { App } from "vue"

/* 基础组件 */
import MiCard from "./Card"
import MiIcon from "./Icon"
import MiImage from "./Image"

/* 功能组件 */
import MiImageList from "./ImageList"
import MiArticle from "./Article"
import MiVirtualScroll from "./VirtualScroll"
import MiHorTimeline from "./HorizontalTimeline"
import MiGallery from "./Gallery"
import MiAddRows from "./AddRows"

const components: any[] = [
  MiCard,
  MiImageList,
  MiVirtualScroll,
  MiHorTimeline,
  MiArticle,
  MiIcon,
  MiImage,
  MiGallery,
  MiAddRows
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
  MiCard,
  MiImageList,
  MiVirtualScroll,
  MiHorTimeline,
  MiArticle,
  MiIcon,
  MiImage,
  MiGallery,
  MiAddRows
}

// 全部导出
export default {
  install,
  ...components
};