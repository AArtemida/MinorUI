---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# SplitPane 分栏面板
左右分栏布局，中间分隔条可拖拽调整左侧宽度；`left-hide` 可完全收起左侧。

### 基础用法

```vue demo src="../components/demo/splitPane/Demo.vue"
```

### Attributes

| 参数           | 说明                     | 类型    | 可选值 | 默认值 |
| -------------- | ------------------------ | ------- | ------ | ------ |
| left-width     | 左侧初始宽度(px)         | number  | —      | 220    |
| right-min-width| 右侧内容最小宽度(px)     | number  | —      | 450    |
| left-hide      | 是否隐藏左侧栏           | boolean | —      | false  |

### Slots

| 插槽名 | 说明       |
| ------ | ---------- |
| left   | 左侧内容   |
| right  | 右侧内容   |

### Events

| 事件名称  | 说明                     | 回调参数 |
| --------- | ------------------------ | -------- |
| dragMove  | 拖拽分隔条过程中持续触发 | —        |
| dragEnd   | 拖拽结束时触发           | —        |
