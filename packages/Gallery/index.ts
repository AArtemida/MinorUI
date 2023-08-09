import type { App } from "vue";
import Gallery from "./index.vue";

// 安装
Gallery.install = (app: App): void => {
  app.component(Gallery.name || 'MiGallery', Gallery)
};
const MiGallery = Gallery
export default MiGallery;