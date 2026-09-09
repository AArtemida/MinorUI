import type { App } from "vue";
import IpInput from "./index.vue";

// 安装
IpInput.install = (app: App): void => {
  app.component(IpInput.name || 'MiIpInput', IpInput)
};
const MiIpInput = IpInput
export default MiIpInput;
