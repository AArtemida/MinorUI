import type { App } from "vue";
import DragDialog from "./index.vue";

// 安装
DragDialog.install = (app: App): void => {
  app.component(DragDialog.name || 'MiDragDialog', DragDialog)
};
const MiDragDialog = DragDialog
export default MiDragDialog;
