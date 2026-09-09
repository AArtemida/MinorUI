---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# Icon 图标
基于 iconfont 的字体图标组件，通过 `icon` 属性指定图标类名。

### 基础用法

```vue demo
<template>
  <span style="font-size: 24px;">
    <mi-icon icon="icon-jia"></mi-icon>
    <mi-icon icon="icon-jian"></mi-icon>
    <mi-icon icon="icon-xihuan"></mi-icon>
    <mi-icon icon="icon-shanchu"></mi-icon>
  </span>
</template>
```

### 全部图标

```vue demo
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <span
      v-for="name in icons"
      :key="name"
      style="display: inline-flex; align-items: center; gap: 4px; font-size: 16px; padding: 4px 8px; border: 1px solid #eee; border-radius: 4px;"
    >
      <mi-icon :icon="name"></mi-icon>
      {{ name }}
    </span>
  </div>
</template>

<script setup>
const icons = [
  'icon-queren',
  'icon-cuo',
  'icon-bianji',
  'icon-jia',
  'icon-jian',
  'icon-xiangshang2',
  'icon-xiangxia2',
  'icon-xiangyou1',
  'icon-xiangzuo1',
  'icon-shoucang',
  'icon-bianjishuru',
  'icon-xihuan',
  'icon-xihuan1',
  'icon-wushuju',
  'icon-charutupian',
  'icon-shanchu',
  'icon-soushu',
  'icon-shoucang1',
  'icon-xiangshang',
  'icon-xiangxia',
]
</script>
```

### Props

| 参数        | 说明           | 类型   | 默认值 |
| ----------- | -------------- | ------ | ------ |
| icon        | 图标类名       | string | ——     |

### Slots

| 插槽名        | 说明           |
| ----------- | -------------- |
| ——          | 图标后追加的内容  |
