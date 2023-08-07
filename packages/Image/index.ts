import type { App } from "vue";
import Image from "./index.vue";

// 安装
Image.install = (app: App): void => {
  app.component(Image.name || 'MiImage', Image)
};
const MiImage = Image
export default MiImage;