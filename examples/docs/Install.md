<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-30 16:36:39
 * @LastEditors: hy
 * @LastEditTime: 2022-06-23 14:08:37
-->
# 安装
这是一个支持Vue3的简单UI库，仅包含部分常用的功能组件。

### 环境要求

- 项目基于 **Vue 3.x**（`>= 3.2`），使用 Vite / Webpack 等构建工具均可
- 现代浏览器（Chrome、Edge、Firefox、Safari），不支持 IE 11
- 组件库仅依赖 `vue`，无其他运行时依赖

### npm 安装
推荐使用 npm 的方式安装，它和 webpack、vite 等打包工具配合良好。

```cmd
  npm i v-minor-ui -S
```

也可以使用 yarn 或 pnpm：

```cmd
  yarn add v-minor-ui

  pnpm add v-minor-ui
```

### CDN 引入
不想引入构建步骤时，可以直接通过 [unpkg](https://unpkg.com/) 引入 UMD 包。注意：UMD 包不内置 `vue`，需要先加载 Vue：

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/v-minor-ui/lib/themes/index.css" />
  </head>
  <body>
    <div id="app">
      <mi-card>一个卡片</mi-card>
    </div>
    <script src="https://unpkg.com/vue@3"></script>
    <script src="https://unpkg.com/v-minor-ui/lib/minorUi.umd.js"></script>
    <script>
      const { createApp } = Vue
      const app = createApp({
        template: '<mi-card>一个卡片</mi-card>',
      })
      app.use(minorUi)
      app.mount('#app')
    </script>
  </body>
</html>
```

生产环境建议锁定版本，避免上游发版导致页面不可用：

```html
<script src="https://unpkg.com/v-minor-ui@0.1.4/lib/minorUi.umd.js"></script>
```

### 包内容说明

安装后 `node_modules/v-minor-ui` 目录主要包含：

| 目录 / 文件 | 说明 |
| ---- | ---- |
| `lib/minorUi.umd.js` | UMD 全量包（CDN / script 标签使用） |
| `lib/es/` | ES Module 按组件目录输出（按需引入、tree-shaking 使用），含 `.d.ts` 类型声明 |
| `lib/themes/` | 编译后的样式，`index.css` 为全量样式，其余为单组件样式 |
| `resolver/` | unplugin-vue-components 按需引入 resolver |

安装完成后，请继续阅读「快速开始」。
