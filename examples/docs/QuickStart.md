<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-30 14:04:24
 * @LastEditors: hy
 * @LastEditTime: 2021-11-30 16:41:13
-->
## 快速上手
本节将介绍如何在项目中使用 v-minor-ui。

### 全局导入

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
### 按需引入
```js
// 导入UI样式
import 'v-minor-ui/lib/themes/index.css'
```
```vue
<template>
  <mi-card>一个卡片</mi-card>
</template>
<script setup>
  import { MiCard } from 'v-minor-ui'
</script>
```