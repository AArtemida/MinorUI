<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-30 16:38:00
 * @LastEditors: hy
 * @LastEditTime: 2022-06-24 14:50:07
-->
# 主题
组件样式基于 CSS 变量（Custom Properties）构建，默认主题色是<span style="margin-left: 5px;background: #7c3aed;color: #fff;">#7c3aed</span>

<br>

所有主题变量均声明在 `:root` 下，因此可以直接重写:root下的css变量来覆盖主题色，无需重新编译。

### 主题变量

| 变量 | 默认值 | 说明 |
| ---- | ---- | ---- |
| `--color-primary` | `#7c3aed` | 主题色，用于按钮、选中态、输入框聚焦边框等 |
| `--color-bg` | `#fff` | 组件背景色 |
| `--color-white` | `#fff` | 基础白色 |
| `--color-black` | `#000` | 基础黑色 |
| `--color-border` | `#dcdfe6` | 边框色 |
| `--color-border-light` | `#e4e7ed` | 浅边框色（分割线等） |
| `--color-box-shadow-light` | `0 0 12px rgba(0, 0, 0, 0.12)` | 浮层阴影 |
| `--color-image-bg` | `#d1effa` | 图片加载中的占位背景色 |
| `--text-color-primary` | `#303133` | 主要文字颜色 |
| `--text-color-regular` | `#606266` | 常规文字颜色 |
| `--text-color-secondary` | `#909399` | 次要文字颜色 |

### 覆盖主题变量

全局覆盖：在引入组件库样式之后重写变量即可。

```css
:root {
  --color-primary: #409eff;
}
```

局部覆盖：将变量声明在某个容器上，只影响该容器内的组件。

```css
.custom-theme {
  --color-primary: #13c2c2;
}
```

```html
<div class="custom-theme">
  <mi-input placeholder="这个输入框聚焦时是青色的"></mi-input>
</div>
```

### 动态切换主题色

CSS 变量可在运行时修改，通过 `document.documentElement.style.setProperty` 即可实现动态换肤。点击下方色球切换主题色，并聚焦输入框查看效果（整个文档站的主题色都会随之变化）：

```vue demo
<template>
  <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 12px;">
    <span
      v-for="c in colors"
      :key="c.value"
      @click="setColor(c.value)"
      :style="{
        background: c.value,
        outline: c.value === current ? '2px solid #303133' : 'none',
        outlineOffset: '2px',
      }"
      style="width: 28px; height: 28px; border-radius: 50%; cursor: pointer; display: inline-block;"
    ></span>
    <mi-input
      v-model="text"
      placeholder="聚焦查看主题色变化"
      style="width: 240px; margin-left: 8px;"
    ></mi-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
const DEFAULT = '#7c3aed'
const current = ref(DEFAULT)
const colors = [
  { value: DEFAULT },
  { value: '#409eff' },
  { value: '#13c2c2' },
  { value: '#f5222d' },
  { value: '#faad14' },
]
const setColor = (v: string) => {
  current.value = v
  document.documentElement.style.setProperty('--color-primary', v)
}
</script>
```

### SCSS 源码定制

主题源码位于 `packages/themes/src`，SCSS 变量均以 `!default` 声明（见 `common/var.scss`）：

```scss
$color-primary: #7c3aed !default;
$color-success: #20c997 !default;
$color-danger: #dc3545 !default;
```

如需修改默认值（而不只是运行时覆盖），克隆仓库后编辑 `packages/themes/src/common/var.scss`，再执行以下命令重新编译主题：

```bash
yarn build:theme
```

一般场景直接覆盖 CSS 变量即可，无需重新编译。
