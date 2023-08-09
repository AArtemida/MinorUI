---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# Gallery 照片墙
照片墙组件，默认显示一行，超出隐藏，支持传入图片列表。

### 基础用法
```vue demo src="../components/demo/gallery/Demo.vue"
```

### Attributes

| 参数        | 说明           | 类型    | 可选值                                             | 默认值 |
| ----------- | -------------- | ------- | -------------------------------------------------- | ------ |
| imgList     | 图片列表数据   | Array  | —                                                   | —      |
| width       | 每项的宽度     | Number  | —                                                 | 120    |
| padding     | 每项间隔宽度   | Number  | —                                                 | 10    |

### Slots

| 插槽名      | 说明           |
| ----------- | -------------- |
| image       | 图片区域       |

### Events

| 事件名称    | 说明              | 回调参数 |
| ----------  | ---------------- | -------- |
| img-click   | 点击图片          | Image    |