import type { App } from "vue";
import Input from "./index.vue";

// 安装
Input.install = (app: App): void => {
  app.component(Input.name || 'MiInput', Input)
};
const MiInput = Input
export default MiInput;
