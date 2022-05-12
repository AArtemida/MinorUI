---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

## Timeline 横向时间轴
用于展示时间轴数据，支持拖动和滚轮。

### 基础用法

```vue demo src="../components/demo/horTimeline/TimelineDemo.vue"
```

### Attributes

| 参数        | 说明           | 类型    | 可选值                                             | 默认值 |
| ----------- | -------------- | ------- | -------------------------------------------------- | ------ |
| list        | 时间轴列表数据       | object  | —                                                 | —      |

### Slots

| 插槽名      | 说明               |
| ----------- | -----------------    |
| ——          | 内嵌的列表卡片       |
| time        | 自定义时间轴横线内容 |