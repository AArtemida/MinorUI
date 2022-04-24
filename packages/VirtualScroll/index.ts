/*
 * @Description:
 * @Author: hy
 * @Date: 2022-02-09 16:41:44
 * @LastEditors: hy
 * @LastEditTime: 2022-02-09 17:29:47
 */
import type { App } from "vue";
import VirtualScroll from "./index.vue";
import { SFCWithInstall } from "../types";

// 安装
VirtualScroll.install = (app: App): void => {
  app.component(VirtualScroll.name, VirtualScroll);
};
const MiVirtualScroll: SFCWithInstall<typeof VirtualScroll> = VirtualScroll; // 增加类型
export default MiVirtualScroll;