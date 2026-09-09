import type { App } from "vue";
import Icon from "./Index.vue";

// 安装
Icon.install = (app: App): void => {
  app.component(Icon.name || 'MiIcon', Icon)
};
const MiIcon = Icon
export default MiIcon;