/*
 * @Description:
 * @Author: hy
 * @Date: 2022-04-18 17:01:27
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 17:37:21
 */
import type { App } from "vue";
import HorizontalTimeline from "./Index.vue";
import { SFCWithInstall } from "../types";

// 安装
HorizontalTimeline.install = (app: App): void => {
  app.component(HorizontalTimeline.name, HorizontalTimeline);
};
const MiHorTimeline: SFCWithInstall<typeof HorizontalTimeline> = HorizontalTimeline; // 增加类型
export default MiHorTimeline;