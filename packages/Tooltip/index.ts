import type { App } from "vue";
import Tooltip from "./index.vue";

// 安装
Tooltip.install = (app: App): void => {
  app.component(Tooltip.name || 'MiTooltip', Tooltip)
};
const MiTooltip = Tooltip
export default MiTooltip;
