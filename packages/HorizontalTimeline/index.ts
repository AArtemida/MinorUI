/*
 * @Description:
 * @Author: hy
 * @Date: 2022-04-18 17:01:27
 * @LastEditors: hy
 * @LastEditTime: 2022-04-18 17:04:55
 */
import type { App } from "vue";
import HorizontalTimeline from "./Index.vue";
import { SFCWithInstall } from "../types";

// 安装
HorizontalTimeline.install = (app: App): void => {
  app.component(HorizontalTimeline.name, HorizontalTimeline);
};
const MiHorizontalTimeline: SFCWithInstall<typeof HorizontalTimeline> = HorizontalTimeline; // 增加类型
export default MiHorizontalTimeline;