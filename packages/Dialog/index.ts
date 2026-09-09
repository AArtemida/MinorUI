import type { App } from "vue";
import Dialog from "./index.vue";

// 安装
Dialog.install = (app: App): void => {
  app.component(Dialog.name || 'MiDialog', Dialog)
};
const MiDialog = Dialog
export default MiDialog;
