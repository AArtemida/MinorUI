---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# Image 图片
一个基础的图片组件。

### 基础用法

```vue demo
<template>
  <div style="width: 200px; height: 200px;">
    <mi-image src="https://tse2-mm.cn.bing.net/th/id/OIP-C.xYVe8aav6Ujm_4nvLofJ6QHaID?w=192&h=209&c=7&r=0&o=5&pid=1.7"></mi-image>
  </div>
</template>
```

### Attributes

| 参数     | 说明                 | 类型     | 可选值 | 默认值   |
| -------- | -------------------- | -------  | ------ | -------- |
| src      | 图片链接              | string   | —      | —        |
| alt      | 原生属性 alt          | string   | —      | —        |
| lazy     | 是否开启懒加载         | boolean  | —      | false    |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| error   | 图片加载失败显示内容     |
| loading | 图片加载中显示内容       |

### Events

| 事件名称    | 说明              | 回调参数 |
| ----------  | ---------------- | -------- |
| load        | 图片加载完成      | event    |
| error       | 图片加载失败      | event    |
| img-click   | 点击图片          | -    |
