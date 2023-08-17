import type { App } from "vue";
import ImagePreview from "./index.vue";

// 安装
ImagePreview.install = (app: App): void => {
  app.component(ImagePreview.name || 'MiImagePreview', ImagePreview)
};
const MiImagePreview = ImagePreview
export default MiImagePreview;