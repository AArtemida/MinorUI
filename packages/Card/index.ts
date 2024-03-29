/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-29 15:08:41
 * @LastEditors: hy
 * @LastEditTime: 2021-11-29 15:10:31
 */
import type { App } from "vue";
import Card from "./card.vue";
// import { SFCWithInstall } from "../types";

// 安装
Card.install = (app: App): void => {
  app.component(Card.name || 'MiCard', Card)
};
// const MiCard: SFCWithInstall<typeof Card> = Card; // 增加类型
const MiCard = Card
export default MiCard;