---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# Article 文章卡片

一个简单的文章卡片，包含图片、标题、内容以及操作区域。

### 基础用法

```vue demo src="../components/demo/article/Demo.vue"

```

### 使用插槽

```vue demo
<template>
  <mi-article :show-more="false">
    <template v-slot:title>
      <div class="mi-article__title">插入的标题</div>
    </template>
    <template v-slot:content>
      插入的摘要
    </template>
  </mi-article>
</template>
```

### Attributes

| 参数     | 说明                 | 类型    | 可选值 | 默认值   |
| -------- | -------------------- | ------- | ------ | -------- |
| title    | 标题                 | string  | —      | —        |
| content  | 摘要/内容            | string  | —      | —        |
| img      | 背景图片             | string  | —      | —        |
| showMore | 是否显示查看详情按钮 | boolean | —      | true     |
| moreTxt  | 查看详情按钮文案     | string  | —      | 查看详情 |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| image   | 图片     |
| title   | 标题     |
| content | 内容     |
| operate | 操作区域 |

### Events

| 事件名称    | 说明             | 回调参数 |
| ----------- | ---------------- | -------- |
| link-detail | 点击查看详情事件 | props    |
