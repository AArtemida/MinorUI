---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# DragDialog 编辑数据列

表格列的显隐编辑与拖拽排序。双面板(显示/隐藏)之间以及面板内部均可拖拽调整,首项(默认项)固定不可拖动。基于原生 HTML5 拖拽实现,无第三方依赖。

```vue demo src="../components/demo/dragDialog/Demo.vue"
```

### Attributes

| 参数       | 说明                                  | 类型            | 可选值 | 默认值   |
| ---------- | ------------------------------------- | --------------- | ------ | -------- |
| columns    | 列配置 `{ key, label, visible }`,visible:0 显示 / 1 隐藏 | array  | —      | []       |
| title      | 弹窗标题(同时作为触发按钮 tooltip)    | string          | —      | 编辑数据列 |
| left-title | 左侧面板标题                           | string          | —      | 显示     |
| right-title| 右侧面板标题                           | string          | —      | 隐藏     |
| width      | 弹窗宽度                               | number / string | —      | 624      |
| height     | 列表面板高度                           | number / string | —      | 400      |
| gutter     | 触发按钮与后续元素的间距               | number          | —      | 0        |

### Events

| 事件名 | 说明                       | 回调参数                    |
| ------ | -------------------------- | --------------------------- |
| submit | 点击确认后触发             | `(columns: array)` 排序并标记 visible 后的完整列配置 |

### Slots

| 插槽名  | 说明                                       |
| ------- | ------------------------------------------ |
| trigger | 自定义触发元素,作用域参数 `{ open }` 打开弹窗的方法 |
