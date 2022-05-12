---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# ImageList 图片列表
一个简单的图片列表组件，支持传入图片列表，左右点击可滚动列表。

## 基础用法

```vue demo src="../components/demo/imageList/ImagesDemo.vue"
```

## 带标题的列表

```vue demo src="../components/demo/imageList/ImagesDemoWithTitle.vue"
```

### Attributes

| 参数        | 说明           | 类型    | 可选值                                             | 默认值 |
| ----------- | -------------- | ------- | -------------------------------------------------- | ------ |
| imgList     | 图片列表数据   | Array  | —                                                   | —      |
| width       | 每项的宽度     | Number  | —                                                 | 120    |
| showLabel   | 是否显示标题栏 | Boolean  | —                                                 | false    |

### Slots

| 插槽名      | 说明           |
| ----------- | -------------- |
| label       | 自定义标题栏   |