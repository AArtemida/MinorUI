import type { App } from "vue";
import SearchInput from "./index.vue";

// 安装
SearchInput.install = (app: App): void => {
  app.component(SearchInput.name || 'MiSearchInput', SearchInput)
};
const MiSearchInput = SearchInput
export default MiSearchInput;
