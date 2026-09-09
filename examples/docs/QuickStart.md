<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-30 14:04:24
 * @LastEditors: hy
 * @LastEditTime: 2021-11-30 16:41:13
-->
# 快速上手
本节将介绍如何在项目中使用 v-minor-ui。

组件库提供了四种引入方式：**全局导入**、**自动按需引入（推荐）**、**手动按需引入**、**具名导入**，可按项目规模选择。小型项目或快速原型用全局导入最省事；中大型项目推荐按需引入，只打包用到的组件与样式。

### 全局导入

在入口文件注册组件库，一次性注册全部组件并引入全量样式。

```js
import { createApp } from 'vue'
// 导入ui组件库
import minorUI from 'v-minor-ui'
// 导入UI样式
import 'v-minor-ui/lib/themes/index.css'

import App from './App.vue'

const app = createApp(App)

// 注册组件库
app.use(minorUI)

app.mount('#app')
```

注册后所有组件均可在模板中直接使用，组件名为 `mi-` 前缀的 kebab-case 或 PascalCase：

```vue
<template>
  <mi-card>一个卡片</mi-card>
  <!-- 等价于 <MiCard>一个卡片</MiCard> -->
</template>
```

### 按需引入

方式一：手动引入（组件 JS 与样式一一对应，样式文件见 `v-minor-ui/lib/themes/`）

```vue
<template>
  <mi-card>一个卡片</mi-card>
</template>
<script setup>
  import MiCard from 'v-minor-ui/lib/es/Card'
</script>
<style>
  @import 'v-minor-ui/lib/themes/card.css';
</style>
```

注意：部分组件内部依赖其他组件，依赖的样式也需要一并引入。例如照片墙内部使用了 Image、ImagePreview、Icon：

```js
import MiGallery from 'v-minor-ui/lib/es/Gallery'
import 'v-minor-ui/lib/themes/gallery.css'
// 内部依赖的样式
import 'v-minor-ui/lib/themes/image.css'
import 'v-minor-ui/lib/themes/imagePreview.css'
import 'v-minor-ui/lib/themes/icon.css'
```

方式二：自动按需引入（推荐，模板直接写 `<mi-card>`，无需注册和引样式）

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 配合本库提供的 resolver，组件 JS 与样式（含内部依赖样式）都会自动按需引入：

```js
// vite.config.js
import Components from 'unplugin-vue-components/vite'
import { MinorUIResolver } from 'v-minor-ui/resolver'

export default {
  plugins: [
    Components({
      resolvers: [MinorUIResolver()],
    }),
  ],
}
```

webpack 项目使用 `/webpack` 入口：

```js
// webpack.config.js / vue.config.js
const Components = require('unplugin-vue-components/webpack')
const { MinorUIResolver } = require('v-minor-ui/resolver')

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [MinorUIResolver()],
      }),
    ],
  },
}
```

方式三：具名导入（配合打包器 tree-shaking，只需引入用到的样式）

组件库已正确配置 `module`、`exports` 与 `sideEffects`（仅 CSS/SCSS 有副作用），具名导入时未用到的组件 JS 会被自动摇掉：

```vue
<template>
  <mi-card>一个卡片</mi-card>
</template>
<script setup>
  import { MiCard } from 'v-minor-ui'
  // 组件内部依赖的样式仍需手动引入
  import 'v-minor-ui/lib/themes/card.css'
</script>
```

### TypeScript 支持

组件库自带类型声明（`lib/es/**/*.d.ts`），`package.json` 已配置 `types` 与 `exports` 字段，无需额外安装 `@types` 包或手动配置路径，IDE 中可直接获得参数与类型提示。

### 常见问题

- **按需引入后样式缺失 / 组件显示异常**：一般是漏引了内部依赖组件的样式。最简单的排查方式是临时换成全量样式 `v-minor-ui/lib/themes/index.css`，恢复后再逐个补齐；或直接使用方式二，由 resolver 自动处理依赖样式。
- **模板中组件不生效**：确认全局导入时已 `app.use(minorUI)`，按需引入时组件名拼写为 `MiXxx` / `mi-xxx`。
- **修改主题色**：所有主题变量基于 CSS 变量，见「自定义主题」。
