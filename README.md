# v-minor-ui

A Vue 3 UI component library with a minimal design. 轻量组件，随取随用。

## 特性

- 🎨 基于 CSS 变量的主题定制，支持运行时动态换肤
- 📦 支持按需引入，提供 `unplugin-vue-components` resolver 自动引入组件与样式
- 🖖 Vue 3 + TypeScript 编写
- 💎 除 `vue` 外无其他运行时依赖

## 安装

Install `v-minor-ui` using [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/):

```bash
# Using NPM
npm install --save v-minor-ui

# Using Yarn
yarn add v-minor-ui
```

## 使用

### 全局引入

```js
// main.ts
import 'v-minor-ui/lib/themes/index.css'
import MinorUi from 'v-minor-ui'

app.use(MinorUi)
```

```html
<mi-card>这是卡片内容</mi-card>
```

### 按需引入（推荐）

配合 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 使用，模板中直接写 `<mi-card>`，组件 JS 与样式均自动按需引入：

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

也可手动引入：

```js
import MiCard from 'v-minor-ui/lib/es/Card'
import 'v-minor-ui/lib/themes/card.css'
```

更多引入方式见文档站「快速上手」。

## 组件

### 基础组件

| 组件 | 说明 |
| ---- | ---- |
| Card 卡片 | 信息容器 |
| Icon 图标 | 矢量图标 |
| Image 图片 | 图片展示、懒加载、预览 |
| Input 输入框 | 文本输入、清空、密码框 |
| IpInput IP 输入框 | IP 地址分段输入 |
| Dialog 弹窗 | 模态对话框 |
| Tooltip 文字提示 | 悬浮提示 |
| SplitPane 分栏面板 | 可拖拽分栏 |

### 业务组件

| 组件 | 说明 |
| ---- | ---- |
| SearchInput 搜索输入框 | 带搜索图标的输入框 |
| ImageList 图片列表 | 横向滚动、按钮翻页 |
| Gallery 照片墙 | 网格布局、分组角标 |
| ImagePreview 图片预览 | 全屏预览、缩放 |
| Article 文章卡片 | 头部、操作区 |
| AddRows 动态行 | 动态增删行 |
| VirtualScroll 虚拟滚动 | 大列表虚拟滚动 |
| HorizontalTimeline 时间轴 | 横向拖拽时间轴 |
| DragDialog 编辑数据列 | 可拖拽、可缩放的数据编辑弹窗 |

## 文档与开发

本地运行文档站（含全部组件示例与 API 说明）：

```bash
yarn install
yarn dev
```

构建产物（`lib/` 下含 UMD / ES Module / 主题样式 / 类型声明）：

```bash
yarn build          # 清理并构建主题 + 全量包 + ES Module 按需包
yarn build:theme    # 仅构建主题样式（lib/themes）
```

## 界面风格
![home page](https://github.com/AArtemida/MinorUI/main/examples/assets/index-page.png)

![component docs](https://github.com/AArtemida/MinorUI/main/examples/assets/doc-page.png)