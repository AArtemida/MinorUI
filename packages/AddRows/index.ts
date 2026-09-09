import type { App } from "vue";
import AddRows from "./index.vue";

// 安装
AddRows.install = (app: App): void => {
  app.component(AddRows.name || 'MiAddRows', AddRows)
};
const MiAddRows = AddRows
export default MiAddRows;