import type { App } from "vue";
import Article from "./index.vue";

// 安装
Article.install = (app: App): void => {
  app.component(Article.name || 'MiArticle', Article)
};
const MiArticle = Article
export default MiArticle;