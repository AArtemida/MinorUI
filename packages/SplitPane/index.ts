import type { App } from "vue";
import SplitPane from "./index.vue";

// 安装
SplitPane.install = (app: App): void => {
  app.component(SplitPane.name || 'MiSplitPane', SplitPane)
};
const MiSplitPane = SplitPane
export default MiSplitPane;
