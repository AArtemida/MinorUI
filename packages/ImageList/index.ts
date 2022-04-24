/*
 * @Description:
 * @Author: hy
 * @Date: 2021-12-15 16:54:08
 * @LastEditors: hy
 * @LastEditTime: 2021-12-15 16:55:28
 */
import type { App } from "vue";
import ImageList from "./Index.vue";
import { SFCWithInstall } from "../types";

// 安装
ImageList.install = (app: App): void => {
  app.component(ImageList.name, ImageList);
};
const MiImageList: SFCWithInstall<typeof ImageList> = ImageList; // 增加类型
export default MiImageList;